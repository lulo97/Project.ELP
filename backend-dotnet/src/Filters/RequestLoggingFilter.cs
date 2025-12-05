using Microsoft.AspNetCore.Mvc.Filters;
using System.Text.Json;

public class RequestLoggingFilter : IActionFilter
{
    public RequestLoggingFilter()
    {
    }

    public void OnActionExecuting(ActionExecutingContext context)
    {
        var actionName = context.ActionDescriptor.DisplayName;
        var httpMethod = context.HttpContext.Request.Method;
        var route = context.HttpContext.Request.Path;

        var inputs = JsonSerializer.Serialize(context.ActionArguments);

        Console.WriteLine($"Request: {httpMethod} {route}, Action: {actionName}, Inputs: {inputs}");
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        // Optional after-action logging
    }
}
