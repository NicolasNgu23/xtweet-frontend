function topHashtags(data) {
    // Extraction de tous les hashtags
    const allHashtags = data.flatMap(tweet => tweet.hashtags || []);

    // Création d'un objet avec chaque hashtag unique et le nombre d'occurrences
    const hashtagCounts = allHashtags.reduce((accumulator, hashtag) => {

        const existingHashtag = accumulator.find(item => item.hashtag === hashtag);

        if (existingHashtag) {
            existingHashtag.nbOccurence++;
        } else {
            accumulator.push({ hashtag, nbOccurence: 1 });
        }

        return accumulator;
    }, []);

    hashtagCounts.sort((a, b) => b.nbOccurence - a.nbOccurence);

    return hashtagCounts;
}


module.exports = { topHashtags } 