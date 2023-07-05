namespace ClinicWebAPI.Classes
{
    public class Account
    {
        public Account() { }

        public Account(string firstname, string lastname, string email, string password, string pid, string img, string category, string cv, int stars, string accountType)
        {
            this.firstname = firstname;
            this.lastname = lastname;
            this.email = email;
            this.password = password;
            this.pid = pid;
            this.img = img;
            this.category = category;
            this.cv = cv;
            this.stars = stars;
            this.accountType = accountType;
        }

        public string firstname { get; set; }
        public string lastname { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string pid { get; set; } 
        public string img { get; set; }
        public string category { get; set; }
        public string cv { get; set; }
        public int stars { get; set; }
        public string accountType { get; set; }



    }
}

