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
	"Minu soengu nimetuseks on Lähme Mammuteid Küttima",
	"Teil on kaks viga: te karjute minust üle ja haugute veel vastu ka",
	"Ei saa võrrelda võrreldamatut - Allah on suur",
	"Sa oled saavutanud mitu võitu, üks neist on vähevõitu",
	"Mul tuleb ainult kuldmune ja neid tuleb vaid ühekaupa",
	"Eksperimendi asendame möla ja kriidiga",
	"Ära puuderda, ära peegelda, istu kodus ja heegelda",
	"Kellele meeldib ema, kellele tütar - see on maitse asi",
	"Ärge oma ideaale peenraha vatu vahetage ja kui ennast müüte, siis müüge kallilt",
	"Ma pole kuri inimene, vaid rõõmus sadist",
	"Lugege läbi ja tehke nägu, et saite aru",
	"Kui on üks karv peas, siis on vähevõitu, aga kui on üks karv supi sees, siis on öak, üleliia",
	"Kuulake! Kulub marjaks ära. Kui lähete koju, siis on seal üks kohutavalt suur jõhvikas",
	"Ega seal midagi teha ei ole: inimene jahib, jumal juhib",
	"Elektronid töötavad üksikuna, mitte nagu vene pätid",
	"Paralleelsed sirged ei kohtu enne üheteistkümnendat kilomeetrit",
	"Siin esitan küsimusi mina",
	"Noored inimesed arvavad, et tähis on raha, vanad inimesed teavad seda",
	"Vanasti, kui veel loomad rääkisid, õunad olid väikesed ning needki ussitanud",
	"Vihmaussi surm on kõige traagilisem vihmaussile endale",
	"Kui vanemleitnant Reemann räägib, siis muusad vaikivad",
	"Katse korda läinud on: seal, kus vaja, lõhkes pomm",
	"Mina vanainimene enam õlut ei joo, õlu teeb laisaks ja lolliks, tean seda omast käest. Ma joon parem viina, see teeb ainult lolliks.",
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
