using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using MimeKit;
using MimeKit.Text;
using Org.BouncyCastle.Crypto;
using Org.BouncyCastle.Utilities.Collections;
using System.Data;
using System.Reflection.PortableExecutable;
using System.Text;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;

namespace ClinicWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VerificationController : ControllerBase
    {
        private readonly string _connectionString = "Server=DESKTOP-IJL7MF3; Database=ClinicDatabase; Trusted_Connection=true; TrustServerCertificate=True";

        [HttpPost("SendMail")]
        public async Task<IActionResult> SendEmailAsync(string emailToVerify, string body)
        {
            emailToVerify = emailToVerify.ToLower();

            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("clinicemailsender@gmail.com"));
            email.To.Add(MailboxAddress.Parse(emailToVerify));
            email.Subject = "Verify Email";
            email.Body = new TextPart(TextFormat.Html) { Text = body };

            using (var smtp = new SmtpClient())
            {
                await smtp.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                await smtp.AuthenticateAsync("clinicemailsender@gmail.com", "xhngbrdauqbyljzu");
                await smtp.SendAsync(email);
                await smtp.DisconnectAsync(true);
            }

            return Ok();
        }

        [HttpPost("AddCode")]
        public async Task<IActionResult> AddCodeAsync(string email)
        {
            email = email.ToLower();

            if (isExpired(email))
            {
                string code = GenerateRandomCode(6);

                using (var conn = new SqlConnection(_connectionString))
                {
                    await conn.OpenAsync();

                    using (var command = new SqlCommand("EXEC addCode @email, @code", conn))
                    {
                        command.Parameters.AddWithValue("@email", email);
                        command.Parameters.AddWithValue("@code", code);

                        await command.ExecuteNonQueryAsync();
                    }
                }

                await SendEmailAsync(email, code + " - this code will be valid for 30 minutes!");
            }
                return Ok();
            
        }

        [HttpGet("IsExpired")]
        public Boolean isExpired(string email) {
            email = email.ToLower();
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                using (SqlCommand cmd = new SqlCommand("SELECT dbo.IsExpired(@email)", conn))
                {
                    cmd.Parameters.AddWithValue("@email", email);

                    object result = cmd.ExecuteScalar();

                   
                   
                        bool isExpired = (bool)result;
                        return isExpired;
                    
                }
            }
        }

        [HttpGet("CheckCode")]
        public bool CheckCode(string email, string codeToCheck)
        {
            email = email.ToLower();
            deleteExpiredCodes();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                using (SqlCommand cmd = new SqlCommand("getCode", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@email", email);

                    object result = cmd.ExecuteScalar();

                    if (result != null && result != DBNull.Value)
                    {
                        string verificationCode = result.ToString();
                        if (verificationCode.Equals(codeToCheck))
                        {
                            return true;
                        }
                        else
                        {
                            return false; // Code doesn't match
                        }
                    }
                    else
                    {
                        return false; // No code found for the given email
                    }
                }
            }
        }

        [HttpDelete("DeleteExpiredCodes")]
        public void deleteExpiredCodes() {
            // C# code to call the DeleteExpiredCodes stored procedure
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                using (SqlCommand cmd = new SqlCommand("DeleteExpiredCodes", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.ExecuteNonQuery();
                }
            }
        }

        private string GenerateRandomCode(int length)
        {
            const string validChars = "1234567890";
            StringBuilder sb = new StringBuilder();
            Random random = new Random();

            for (int i = 0; i < length; i++)
            {
                int randomIndex = random.Next(validChars.Length);
                sb.Append(validChars[randomIndex]);
            }

            return sb.ToString();
        }


        private string GenerateRandomTwoStepCode(int length)
    {
        string Characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        StringBuilder codeBuilder = new StringBuilder();

        Random random = new Random();

            for (int i = 0; i < length; i++)
        {
            int randomIndex = random.Next(Characters.Length);
            char randomChar = Characters[randomIndex];
            codeBuilder.Append(randomChar);
        }

        return codeBuilder.ToString();
    }

        [HttpPost("AddTwoStepCode")]
        public async Task<IActionResult> AddCodeTwoStepAsync(string email)
        {
            email = email.ToLower();

            deleteExpiredTwoStepCodes();

            string code = GenerateRandomTwoStepCode(4);
            if (CheckEmailExists(email))
            {
                return Ok();
            }
            else {
                using (var conn = new SqlConnection(_connectionString))
                {
                    await conn.OpenAsync();

                    using (var command = new SqlCommand("addTwoStepCode", conn))
                    {
                        command.CommandType = CommandType.StoredProcedure;

                        // Set the return value parameter
                        SqlParameter resultParam = new SqlParameter("@Result", SqlDbType.Int);
                        resultParam.Direction = ParameterDirection.ReturnValue;
                        command.Parameters.Add(resultParam);

                        command.Parameters.AddWithValue("@email", email);
                        command.Parameters.AddWithValue("@code", code);

                        await command.ExecuteNonQueryAsync();

                      
                       
                       await SendEmailAsync(email, code + " - this two step verification code will be valid for 5 minutes!");
                        
                      
                    }
                }

                return Ok();
            }
        }

        [HttpDelete("DeleteExpiredTwoStepCodes")]
        public void deleteExpiredTwoStepCodes()
        {
            // C# code to call the DeleteExpiredCodes stored procedure
            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                using (SqlCommand cmd = new SqlCommand("DeleteExpiredTwoStepCodes", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.ExecuteNonQuery();
                }
            }
        }

        private bool CheckEmailExists(string email)
        {
            using (var conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                using (var command = new SqlCommand("SELECT dbo.AlreadyExists(@Email)", conn))
                {
                    command.Parameters.AddWithValue("@Email", email.ToLower());
                    bool emailExists = (bool)command.ExecuteScalar();
                    return emailExists;
                }
            }
        }

        [HttpGet("CheckTwoStepCode")]
        public bool CheckTwoStepCode(string email, string codeToCheck)
        {
            email = email.ToLower();
            deleteExpiredTwoStepCodes();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                using (SqlCommand cmd = new SqlCommand("getTwoStepCode", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@email", email);

                    object result = cmd.ExecuteScalar();

                    if (result != null && result != DBNull.Value)
                    {
                        string verificationCode = result.ToString();
                        if (verificationCode.Equals(codeToCheck))
                        {
                            return true;
                        }
                        else
                        {
                            return false; // Code doesn't match
                        }
                    }
                    else
                    {
                        return false; // No code found for the given email
                    }
                }
            }
        }

        [HttpPost("Verify")]
        public void verify(string email) { 

               email = email.ToLower();

            if (!isVerified(email))
            {
                using (SqlConnection conn = new SqlConnection(_connectionString))
                {
                    conn.Open();

                    using (SqlCommand cmd = new SqlCommand("SetEmailAsVerified", conn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@email", email);

                        cmd.ExecuteNonQuery();




                    }

                    conn.Close();
                }
            }
        }

        [HttpGet("IsVerified")]
        public Boolean isVerified(string email) {
            email = email.ToLower();

            using (SqlConnection conn = new SqlConnection(_connectionString))
            {
                conn.Open();

                using (SqlCommand cmd = new SqlCommand("isVerified", conn))
                {
                    cmd.CommandType = CommandType.StoredProcedure;

                    cmd.Parameters.AddWithValue("@email", email);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            return true; // Email is verified
                        }
                        else
                        {
                            return false; // Email is not verified
                        }
                    }
                }
                conn.Close();
            }
        }
      
      
    }

}

