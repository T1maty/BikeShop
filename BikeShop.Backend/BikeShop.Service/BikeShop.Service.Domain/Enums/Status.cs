namespace BikeShop.Service.Domain.Enums;

public enum Status
{
    Waiting, // 0
    InProcess, // 1
    WaitingSupply, // 2
    Ready, // 3
    Ended, //  4
    Canceled, // 5
    Deleted // 6
}

public class StatusDict
{
    public static Dictionary<string, Status> Get()
    {
        var d = new Dictionary<string, Status>();
        d.Add("Waiting", Status.Waiting);
        d.Add("InProcess", Status.InProcess);
        d.Add("WaitingSupply", Status.WaitingSupply);
        d.Add("Ready", Status.Ready);
        d.Add("Ended", Status.Ended);
        d.Add("Canceled", Status.Canceled);
        d.Add("Deleted", Status.Deleted);
        return d;
    }
}