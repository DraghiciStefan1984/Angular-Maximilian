export class LoggingService 
{
    logStatusChanged(status: string)
    {
        console.log('A server status changed. New status: ' + status);
    }
}