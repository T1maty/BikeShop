using Scriban.Parsing;
using Scriban.Syntax;
using Scriban;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BikeShop.Acts.Domain.DTO.Scriban
{
    public class TypedContext : TemplateContext
    {
        readonly object o;
        readonly Type type;

        public TypedContext(object o)
        {
            ArgumentNullException.ThrowIfNull(o);

            this.o = o;
            type = o.GetType();
            TryGetMember = getMember;
            TryGetVariable = getVariable;
            PushCulture(CultureInfo.InvariantCulture);
        }

        bool getMember(TemplateContext context, SourceSpan span, object target, string member, out object value)
        {
            value = target?.GetType().GetProperty(member)?.GetValue(target)!;
            return value != null!;
        }

        bool getVariable(TemplateContext context, SourceSpan span, ScriptVariable variable, out object value)
        {
            value = type.GetProperty(variable.Name)?.GetValue(o)!;
            return value != null!;
        }
    }
}
