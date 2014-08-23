#include <amxmodx>
#include <mylib>

public plugin_init()
{
    register_plugin("test", "1.0", "test");
    
    log_amx("My lib version %d", MY_LIB_VERSION);
}