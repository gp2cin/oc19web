module.exports = name => {
    let formated_name = name.toLowerCase()
    formated_name = formated_name.replace(/[áàâã]/g, 'a');
    formated_name = formated_name.replace(/[éèê]/g, 'e');
    formated_name = formated_name.replace(/[ç]/g, 'c');
    formated_name = formated_name.replace(/[íï]/g, 'i');
    formated_name = formated_name.replace(/[óôõö]/g, 'o');
    formated_name = formated_name.replace(/[ú]/g, 'u');
    formated_name = formated_name.replace(/[ñ]/g, 'n');

    return formated_name
}