var zitate = [
	"Eestis kehtib Eesti Energia jäävuse seadus",
	"Statistika on nagu miniseelik: lubab palju, aga ei näita midagi",
	"Harjutamine teeb harjutajaks",
	"Hakkame varem pihta, muidu jääb kaklus pimeda peale",
	"Töö on nii sügav, et siin on tööd tuukritele",
	"O meetripuu, meetripuu seina peal! Kes on kõige pisem ilma peal?",
	"On olemas: väiksed valed, suured valed ning statistika",
	"Päikesesüsteemi kehad: tsentraalne keha, planeedid, asteroidid, komeedid, meteoorkehad ja muu kaka",
	"Kunagi vanasti, kui õunad olid väikesed ja needki olid ussitanud ning kommunistid jooksid vabalt tänaval ringi",
	"Islandlastel on elektrienergiat nii palju, et tapab",
	"Oo, elu, virtsamere haisev lokse! Oo, maailm, purjus jumalate okse!",
	"Vaiki, õnnetu!",
	"Te peaksite rohkem ütlema ja vähem mõtlema. Välja arvatud härra Mere - tema peaks enne mõtlema ja siis ütlema",
	"Minu soegu nimetuseks on Lähme Mammuteid Küttima",
	"Teil on kaks viga: te karjute minust üle ja haugute veel vastu ka",
	"Ei saa võrrelda võrreldamatut - Allah on suur",
	"Sa oled saavutanud mitu võitu, üks neist on vähevõitu",
	"Mul tuleb ainult kuldmune ja neid tuleb vaid ühekaupa",
	">>> Siin võiks seista Sinu pakutud Madis Reemanni tsitaat <<<",
];

var timer = null;

function fix(str) {
	var subst = [ ["ü", "&uuml;"], ["Ü", "&Uuml;"], ["ä", "&auml;"], ["Ä", "&Auml;"], ["ö", "&ouml;"], ["Ö", "&Ouml;"], ["õ", "&otilde;"], ["Õ", "&Otilde;"] ];
	for (var j = 0; j < subst.length; j++)
		str = str.replace(new RegExp(subst[j][0], "g"), subst[j][1]);
	return str;
}
	
function neuZitat() {
	clearTimeout(timer);
	var zitat = zitate[Math.floor(Math.random() * zitate.length)];
	for (; zitat == $("#zitat").text(); zitat = zitate[Math.floor(Math.random() * zitate.length)]);
	$("#zitat").html(fix(zitat));
	timer = setTimeout(neuZitat, 60 * 1000);
}

$(function () {
	timer = setTimeout(neuZitat, 0);
	$("#zitat").click(neuZitat);
});
