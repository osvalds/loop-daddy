export function get_random_color()
{
    return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
}
