import {trigger,transition,style,animate,state} from '@angular/animations';

export const slideDown = trigger('slideDown',[
  state('void', style({opacity:0, top:'-100%'})),
  // state('*', style({opacity:1, right:'0'})),
  transition('void <=> *',[
    animate('200ms ease-in')
  ])
]);

export const hideInOut = trigger('hideInOut',[
  transition('void => *',[
    style({height: "0px"}),
    animate(100, style({height: "26px"}))
  ]),
  transition('* => void',[
    animate(100, style({height: "0px"}))
  ])
]);

export const popupInOut = trigger('popupInOut',[
  state('void', style({opacity:0})),
  // state('*', style({opacity:1, right:'0'})),
  transition('void <=> *',[
    animate('0.1s ease-in')
  ])
]);

export const openClose = trigger('openClose', [
  state('open', style({
    left: '0'
  })),
  state('closed', style({
    left: '-180px'
  })),
  transition('open => closed', [
    animate('0.1s')
  ]),
  transition('closed => open', [
    animate('0.1s')
  ]),
])

export const hideAccordian = trigger('hide',[
  state('void', style({height:'0px'})),
  // state('*', style({opacity:1, right:'0'})),
  transition('void <=> *',[
    animate('0.1s ease-in')
  ])
])

export const hideSteps = trigger('hideSteps',[
  state('open', style({
    height: 'auto'
  })),
  state('closed', style({
    height: '50px'
  })),
  transition('open => closed', [
    animate('1s')
  ]),
  transition('closed => open', [
    animate('1s')
  ]),
])