//jshint esversion:6

exports.getDate = () => {
    let today = new Date();
const options ={
    weekday:"long",
    day:"numeric",
    month:"long"
}

return today.toLocaleDateString("en-US",options);
}
exports.getOnlyDay= () => {
    let today = new Date();
    const options ={
        weekday:"long",
    }
    return today.toLocaleDateString("en-US",options);
}