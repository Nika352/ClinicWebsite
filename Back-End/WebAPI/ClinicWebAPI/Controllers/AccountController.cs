using ClinicWebAPI.Classes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Net.NetworkInformation;
using System.Text.Json.Serialization;
using System.Text.Json;
using Newtonsoft.Json;
using System.Web.Helpers;
using Newtonsoft.Json;
using System.Data;
using System.Collections;

namespace ClinicWebAPI.Controllers
{
    public class AccountController : Controller
    {
        SqlConnection conn = new SqlConnection("Server=DESKTOP-IJL7MF3; Database=ClinicDatabase; " +
       "Trusted_Connection=true; " + "TrustServerCertificate=True");

        [HttpPost("putAccount")]
        public Account putAccountInDb([FromBody] Account acc)
        {

            SqlCommand command = new SqlCommand("addNewAccount", conn);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@firstname", acc.firstname);
            command.Parameters.AddWithValue("@lastname", acc.lastname);
            command.Parameters.AddWithValue("@email", acc.email);
            command.Parameters.AddWithValue("@pass", acc.password);
            command.Parameters.AddWithValue("@pid", acc.pid);
            command.Parameters.AddWithValue("@img", acc.img);
            command.Parameters.AddWithValue("@category", acc.category);
            command.Parameters.AddWithValue("@cv", acc.cv);
            command.Parameters.AddWithValue("@stars", acc.stars);
            command.Parameters.AddWithValue("@accountType", acc.accountType);



            conn.Open();
            command.ExecuteNonQuery();
            conn.Close();


            return acc;
        }

        [HttpGet("getAccount")]
        public Account logIn(string email, string pass)
        {
            SqlCommand command = new SqlCommand("getAccount", conn);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@email", email);
            command.Parameters.AddWithValue("@pass", pass);


            SqlDataAdapter da = new SqlDataAdapter();
            da.SelectCommand = command;

            DataTable dt = new DataTable();
            da.Fill(dt);

            string firstName = dt.Rows[0]["firstname"].ToString();
            string lastName = dt.Rows[0]["lastname"].ToString();
            string pid = dt.Rows[0]["pid"].ToString();
            string img = dt.Rows[0]["img"].ToString();
            string category = dt.Rows[0]["category"].ToString();
            string cv = dt.Rows[0]["cv"].ToString();
            int stars = (int)dt.Rows[0]["stars"];
            string accountType = dt.Rows[0]["accountType"].ToString();

            Account acc = new Account(firstName, lastName, email, pass, pid, img, category, cv, stars, accountType);



            return acc;
        }

        private static Account jsonToAccount(string jsonString)
        {
            Account newAccount = JsonConvert.DeserializeObject<Account>(jsonString);
            return newAccount;
        }

        private static string accountToJson(Account acc) {
            return JsonConvert.SerializeObject(acc);
        }

        [HttpPut("setImage")]
        [RequestSizeLimit(1048576)]
        public Account setImage([FromBody] ImageData imageData) {
            string email = imageData.Email;
            string img = imageData.Img;

            SqlCommand command = new SqlCommand("setImage", conn);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@email", email);
            command.Parameters.AddWithValue("@img", img);

            SqlDataAdapter da = new SqlDataAdapter();
            da.SelectCommand = command;

            DataTable dt = new DataTable();
            da.Fill(dt);

            string firstName = dt.Rows[0]["firstname"].ToString();
            string lastName = dt.Rows[0]["lastname"].ToString();
            string pid = dt.Rows[0]["pid"].ToString();
            string pass = dt.Rows[0]["pass"].ToString();
            string category = dt.Rows[0]["category"].ToString();
            string cv = dt.Rows[0]["cv"].ToString();
            int stars = (int)dt.Rows[0]["stars"];
            string accountType = dt.Rows[0]["accountType"].ToString();

            Account acc = new Account(firstName, lastName, email, pass, pid, img, category, cv, stars, accountType);



            return acc;
        }

        [HttpGet("getDoctors")]
        public List<Account> doctors()
        {
            List<Account> doctors = new List<Account>();

            SqlCommand command = new SqlCommand("getDoctors", conn);
            command.CommandType = CommandType.StoredProcedure;

            SqlDataAdapter da = new SqlDataAdapter();
            da.SelectCommand = command;

            DataTable dt = new DataTable();
            da.Fill(dt);

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                string firstName = dt.Rows[i]["firstname"].ToString();
                string lastName = dt.Rows[i]["lastname"].ToString();
                string email = dt.Rows[i]["email"].ToString();
                string pass = dt.Rows[i]["pass"].ToString();
                string pid = dt.Rows[i]["pid"].ToString();
                string img = dt.Rows[i]["img"].ToString();
                string category = dt.Rows[i]["category"].ToString();
                string cv = dt.Rows[i]["cv"].ToString();
                int stars = (int)dt.Rows[i]["stars"];
                string accountType = dt.Rows[i]["accountType"].ToString();

                doctors.Add(new Account(firstName, lastName, email, pass, pid, img, category, cv, stars, accountType));
            }

            return doctors;
        }

        [HttpPut("changeCategory")]
        public void changeCategory(string email, string category) {
            SqlCommand command = new SqlCommand("changeCategory", conn);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@email", email);
            command.Parameters.AddWithValue("@category", category);


            conn.Open();
            command.ExecuteNonQuery();
            conn.Close();
        }

        [HttpPut("changePassword")]
        public void changePassword(string email, string password)
        {
            SqlCommand command = new SqlCommand("changePassword", conn);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@email", email);
            command.Parameters.AddWithValue("@pass", password);


            conn.Open();
            command.ExecuteNonQuery();
            conn.Close();
        }

        [HttpPut("changeStars")]
        public void changeStars(string email, string stars)
        {
            SqlCommand command = new SqlCommand("changeStars", conn);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@email", email);
            command.Parameters.AddWithValue("@stars", stars);


            conn.Open();
            command.ExecuteNonQuery();
            conn.Close();
        }


        [HttpPut("changeEmail")]
        public void changeEmail(string email, string newEmail)
        {
            SqlCommand command = new SqlCommand("changeEmail", conn);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@email", email);
            command.Parameters.AddWithValue("@newEmail", newEmail);


            conn.Open();
            command.ExecuteNonQuery();
            conn.Close();
        }

        [HttpPut("changePid")]
        public void changePid(string email, string pid)
        {
            SqlCommand command = new SqlCommand("changePid", conn);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@email", email);
            command.Parameters.AddWithValue("@pid", pid);


            conn.Open();
            command.ExecuteNonQuery();
            conn.Close();
        }

        [HttpDelete("deleteAccount")]
        public void deleteAccount(string email) {
            SqlCommand command = new SqlCommand("deleteAccount", conn);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@email", email);

            conn.Open();
            command.ExecuteNonQuery();
            conn.Close();

        }



        [HttpGet("getCategoryCount")]
        public int getCategoryCount(string category) {
            SqlCommand command = new SqlCommand("getCategoryCount", conn);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@category", category);

            SqlDataAdapter da = new SqlDataAdapter();
            da.SelectCommand = command;

            DataTable dt = new DataTable();
            da.Fill(dt);

            return dt.Rows.Count;
        }

       

    }
}
