using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class WebClient3 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        GridView1.DataSource = getAllTopics();
        GridView1.DataBind();
    }

    protected List<Topic> getAllTopics()
    {
        string SERVICE_URL = "http://10.1.110.111:3000/api/topics";
        string retJSON = "";

        try
        {
            using (WebClient webClient = new WebClient())
            {
                webClient.Headers.Add("Content-Type", "application/json; charset=utf-8");

                retJSON = webClient.DownloadString(SERVICE_URL);
                ReturnType res = JsonConvert.DeserializeObject<ReturnType>(retJSON);

                Label1.Text = String.Format("OK ({0})", res.topics.Count);
                return res.topics;
            }
        }
        catch (WebException ex)
        {
            throw ex;
        }
    }

    public class Topic
    {
        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
    }

    public class ReturnType
    {
        public List<Topic> topics { get; set; }
    }
}