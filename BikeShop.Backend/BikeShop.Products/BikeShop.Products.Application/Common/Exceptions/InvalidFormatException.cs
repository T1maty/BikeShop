namespace BikeShop.Products.Application.Common.Exceptions
{
    public class InvalidFormatException : Exception, IException
    {
        public string Error { get; set; }
        public string ErrorDescription { get; set; }

        public InvalidFormatException(string message) : base(message)
        {
        }
    }
}