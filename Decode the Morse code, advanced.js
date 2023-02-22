function decodeBits(bits){
    bits = trim(bits, '0');
    
    const bitsSeq = countDuplicateSequence(bits);
    const duration = getTimeUnits(bitsSeq);
    const charTypeSeparator = '0'.repeat(duration.charType);
    const charSeparator = '0'.repeat(duration.char);
    const wordSeparator = '0'.repeat(duration.word);
    const morseBitsMap = {['1'.repeat(duration.dot)]: '.', ['1'.repeat(duration.dash)]: '-'};
    const toMorse = char => morseBitsMap[char];
    const getCharsType = chars => chars.split(charTypeSeparator).map(toMorse).join('');
    const getChars = words => words.split(charSeparator).map(getCharsType).join(' ');
    const getWords = bits.split(wordSeparator).map(getChars);
    const morse = getWords.join(' '.repeat(3));
    
    return morse;
  }
  
  function decodeMorse(morseCode){
    const wordsMap = morseCode.split(' '.repeat(3)).map(words => words.split(' '));
    const decodeChars = char => MORSE_CODE[char];
    const decodeWords = words => words.map(decodeChars).join('');
    const decodedString = wordsMap.map(decodeWords).join(' ').trim();
    
    return decodedString;
  }
  
  function getTimeUnits(bitsSec) {  
    bitsSec[0] = bitsSec[0] || [];
    bitsSec[1] = bitsSec[1] || [];
    
    const duration = {dot: 1, dash: 3, charType: 1, char: 3, word: 7};
    const minGap = Math.min.apply(null, bitsSec[0]);
    const minMark = Math.min.apply(null, bitsSec[1]);
    const commonMultiplier = Math.min.apply(null, [minGap, minMark]);
    
    Object.keys(duration).forEach((key) => {
      duration[key] *= commonMultiplier;
    });
    
    return duration;
  }
  
  function trim(string, char) {
    return string.replace(new RegExp(`^[\s${char}]+|[\s${char}]+$`, 'g'), '');
  }
  
  function countDuplicateSequence(string) {
    let a = string.split(''), b = {}, sec = 1, cur = '', i = 0, len = a.length;
    
    for (; i < len; i++) {
      cur = a[i];
        
      if (cur === a[i + 1]) {
        sec++;
        continue;
      } else {
        b[cur] = b[cur] || [];
        
        if (sec > 0 && b[cur][b[cur].length - 1] !== sec) {
          b[cur].push(sec);
        }
    
        sec = 1;
      }
    }
    
    Object.keys(b).forEach((key) => {
      b[key] = [...new Set(b[key])].sort((a, b) => b - a);
    });
  
    return b;
  }
  