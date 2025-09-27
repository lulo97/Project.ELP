function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function toPascalCase(str) {
    return str
        .split("_")
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join("");
}

function toTitleCase(str) {
    return str
        .split("_")
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join(" ");
}

module.exports = {
    capitalize,
    toPascalCase,
    toTitleCase,
}