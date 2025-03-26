const trimMediaUrl = ((url) =>
{
    if(!url || url.length < 26)
    return "";
    return (`${url.substring(0,23)}...${url.substring(url.length -6,url.length -1)}`)
})

export {trimMediaUrl};