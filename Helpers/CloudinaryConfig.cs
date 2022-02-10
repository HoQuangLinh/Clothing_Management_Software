using System.Runtime.ConstrainedExecution;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;
using System;
namespace Clothing_Management.Helpers
{
    public class CloudinaryConfig
    {
        public CloudinaryDotNet.Cloudinary Cloudinary;


        //public CloudinaryConfig() { }
        public CloudinaryConfig(CloudinarySettings cloudinarySetting)
        {

            Account account = new Account(cloudinarySetting.CloudName, cloudinarySetting.ApiKey, cloudinarySetting.ApiSecret);
            Cloudinary = new CloudinaryDotNet.Cloudinary(account);

        }

    }
}