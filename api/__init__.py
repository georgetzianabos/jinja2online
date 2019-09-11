from jinja2 import Environment, exceptions

def process(template_text, values):
  
    env = Environment()
    
    try:
        
        template = env.from_string(template_text)
        
        return template.render(values)
        
    except (exceptions.TemplateSyntaxError, exceptions.TemplateError) as e:
        raise Exception("Template error: {}".format(e))
    except (exceptions.TemplateRuntimeError, ValueError, TypeError) as e:
        raise Exception("Error with value: {}".format(e))



  
    