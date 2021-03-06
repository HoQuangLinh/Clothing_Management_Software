using Clothing_Management.Models;
using JavaScriptEngineSwitcher.ChakraCore;
using JavaScriptEngineSwitcher.Extensions.MsDependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using React.AspNet;
using Clothing_Management.Data;
using Clothing_Management.Helpers;
using System;
using Newtonsoft.Json;
namespace React.Sample.Webpack.CoreMvc
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();

            services.AddJsEngineSwitcher(options => options.DefaultEngineName = ChakraCoreJsEngine.EngineName)
                .AddChakraCore();

            services.AddReact();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddDbContext<ClothingManagementDBContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("ClothingManagementConnection")));

            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));
            services.AddSingleton(Configuration.GetSection("CloudinarySettings").Get<CloudinarySettings>());
            services.AddScoped<CloudinaryConfig>();


            // Build the intermediate service provider then return it
            services.BuildServiceProvider();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostEnvironment env)
        {
            // Initialise ReactJS.NET. Must be before static files.
            app.UseReact(config =>
            {
                config
                    .SetReuseJavaScriptEngines(true)
                    .SetLoadBabel(false)
                    .SetLoadReact(false)
                    .SetReactAppBuildPath("~/dist");
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute("default", "{path?}", new { controller = "Home", action = "Index" });
                endpoints.MapControllerRoute("comments-root", "comments", new { controller = "Home", action = "Index" });
                endpoints.MapControllerRoute("comments", "comments/page-{page}", new { controller = "Home", action = "Comments" });
            });
            DataInitializer.Seed(app);
        }
    }
}
