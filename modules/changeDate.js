function changeDate(inputDate) {
    const currentDate = new Date();
    const inputDateTime = new Date(inputDate);

    // Calcul de la différence en millisecondes
    const differenceInMilliseconds = currentDate - inputDateTime;

    // Calcul des jours, heures, minutes et secondes
    const days = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((differenceInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((differenceInMilliseconds % (1000 * 60)) / 1000);

    // Sélection de l'unité et du chiffre correspondant
    let unit = '';
    let value = 0;

    if (days > 0) {
        unit = 'j';
        value = days;
    } else if (hours > 0) {
        unit = 'h';
        value = hours;
    } else if (minutes > 0) {
        unit = 'min';
        value = minutes;
    } else {
        unit = 's';
        value = seconds;
    }

    // Construction de la chaîne de résultat
    return `il y a ${value} ${unit}`;
}

module.exports = { changeDate } 