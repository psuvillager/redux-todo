const once = func => () => typeof func === "function" ? func() : "aint got the func";

exports.once = once;