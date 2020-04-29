const wiki = require('wikijs').default;

function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}

async function find() {
    const search = await wiki({ apiUrl: 'http://pt.wikipedia.org/w/api.php', origin: null }).find('Parasita filme')
    const info = await search.summary()
    const images = await search.images()
    const index = getPosition(info, '.', 3)
    console.log(info.slice(0, index + 1));
    console.log(images)
}

find();
