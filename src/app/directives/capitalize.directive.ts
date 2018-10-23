import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCapitalize]'
})
export class CapitalizeDirective {

  constructor(private el: ElementRef) { }

  @HostListener('blur') onBlur(){
    let sentence = this.el.nativeElement.value;
      let words = sentence.toString().trim().split(" ");
      for(let i of words){
        let pos = words.indexOf(i);
        let alpha = i.toString().split('');
        alpha[0] = alpha[0].toUpperCase();
        alpha = alpha.join('');
        words[pos] = alpha;
      }
      words = words.join(' ');
      this.el.nativeElement.value = words;
  }

}
