export { Char, allChars };

class Char {
	constructor(hiragana, latin) {
		this.hiragana = hiragana;
		this.latin = latin;
	}
}

const allChars = [[
		new Char('あ', 'a'), new Char('い', 'i'), new Char('う', 'u'),
	 	new Char('え', 'e'), new Char('お', 'o')
	], [
		new Char('か', 'ka'), new Char('き', 'ki'), new Char('く', 'ku'),
		new Char('け', 'ke'), new Char('こ', 'ko')
	], [
		new Char('さ', 'sa'), new Char('し', 'shi'), new Char('す', 'su'),
		new Char('せ', 'se'), new Char('そ', 'so')
	], [
		new Char('た', 'ta'), new Char('ち', 'chi'), new Char('つ', 'tsu'),
		new Char('て', 'te'), new Char('と', 'to')
	], [
		new Char('な', 'na'), new Char('に', 'ni'), new Char('ぬ', 'nu'),
		new Char('ね', 'ne'), new Char('の', 'no')
	], [
		new Char('は', 'ha'), new Char('ひ', 'hi'), new Char('ふ', 'hu'),
		new Char('へ', 'he'), new Char('ほ', 'ho')
	], [
		new Char('ま', 'ma'), new Char('み', 'mi'), new Char('む', 'mu'),
		new Char('め', 'me'), new Char('も', 'mo')
	], [
		new Char('や', 'ya'), new Char('ゆ', 'yu'), new Char('よ', 'yo')
	], [
		new Char('ら', 'ra'), new Char('り', 'ri'), new Char('る', 'ru'),
		new Char('れ', 're'), new Char('ろ', 'ro')
	], [
		new Char('わ', 'wa'), new Char('ゐ', 'wo'), new Char('ん', 'n')
]];
