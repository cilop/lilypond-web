(function(){window.helper={},helper.ly=function(a){var b=function(a,b){var c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,s;if(f="fcgdaeb",e="beadgcf",g={},b>0)for(p=f.slice(0,b),k=0,n=p.length;n>k;k++)c=p[k],g[c]="s";if(0>b)for(q=e.slice(0,-b),l=0,o=q.length;o>l;l++)c=q[l],g[c]="f";for(h=["c","d","e","f","g","a","b"],j=h[r(a,7)]+(g[h[r(a,7)]]||""),i=Math.floor(a/7)+1,d=m=0,s=Math.abs(i);s>=0?s>m:m>s;d=s>=0?++m:--m)j+=0>i?",":"'";return j};c=function(a){var b;return b={"-7":"cf","-6":"gf","-5":"df","-4":"af","-3":"ef","-2":"bf","-1":"f",0:"c",1:"g",2:"d",3:"a",4:"e",5:"b",6:"fs",7:"cs"},b[a]};var c,b,d,e,f,g,h,i,j,k,l,m,n,o,p,q=function(b){for(;0!==b&&null==a.meta.measures[b].events.key;)b--;return a.meta.measures[b].events.key||0},r=function(a,b){return(a%b+ +b)%b};for(i='\\include "english.ly"\n',i+="music = {\n",o=a.staves[0].measures,e=k=0,m=o.length;m>k;e=++k){for(g=o[e],null!=(d=g.events.clef)&&(i+="\\clef "+d+"\n"),null!=(f=a.meta.measures[e].events.key)&&(i+="\\key "+c(f)+" \\major\n"),null!=(j=a.meta.measures[e].events.time)&&(i+="\\time "+j.n+"/"+j.d+"\n"),p=g.notes,l=0,n=p.length;n>l;l++)h=p[l],null!=h.duration&&(i+=""+b(h.pitch,q(e))+h.duration.d+" ");i+="\n"}return i+="}\n",i+='\\score { \\new Staff = "music" \\music }\n'}}).call(this),function(){var a,b;a=angular.module("musicSVG",["paths"]),a.directive("ngPath",["paths",function(a){return{restrict:"A",scope:{name:"@",x:"@",y:"@"},link:function(b,c){var d,e,f,g,h;return c.attr({d:(null!=(d=a[b.name])?d.d:void 0)||"M 0 0",transform:"translate("+(b.x||0)+", "+(b.y||0)+") scale("+((null!=(e=a[b.name])&&null!=(f=e.scale)?f.x:void 0)||0)+", "+((null!=(g=a[b.name])&&null!=(h=g.scale)?h.y:void 0)||0)+")",stroke:"currentColor"}),b.$watch("name",function(){var d,e,f,g,h;return c.attr({d:(null!=(d=a[b.name])?d.d:void 0)||"M 0 0",transform:"translate("+(b.x||0)+", "+(b.y||0)+") scale("+((null!=(e=a[b.name])&&null!=(f=e.scale)?f.x:void 0)||0)+", "+((null!=(g=a[b.name])&&null!=(h=g.scale)?h.y:void 0)||0)+")"})})}}}]),a.directive("ngStaff",function(){return{restrict:"A",scope:{width:"@",x:"@",y:"@",single:"="},link:function(a,c){var d,e,f,g,h,i;for(c.attr({transform:"translate("+(a.x||0)+", "+(a.y||0)+")"}),e=a.single?[0]:[-2,-1,0,1,2],i=[],g=0,h=e.length;h>g;g++)d=e[g],f=document.createElementNS(b,"line"),angular.element(f).attr({x1:0,y1:d,x2:a.width,y2:d,"stroke-width":.1,stroke:"currentColor"}),i.push(c.append(f));return i}}}),a.directive("ngLine",function(){return{restrict:"A",scope:{width:"@",x:"@",y:"@"},link:function(a,b){return b.attr({transform:"translate("+(a.x||0)+", "+(a.y||0)+")",x1:0,y1:0,x2:a.width,y2:0,"stroke-width":.1,stroke:"currentColor"})}}}),a.directive("ngKeySignature",function(){return{restrict:"A",scope:{value:"@",x:"@",y:"@"},controller:["$scope",function(a){return a.paths=_.memoize(function(a){var b,c,d,e,f,g,h,i;for(e=a>=0?"sharp":"flat",f=[-1.5,0,-2,-.5,1,-1,.5],b=[.5,-1,1,-.5,1.5,0,2],c="sharp"===e?f:b,i=[],d=g=0,h=Math.abs(a);h>=0?h>g:g>h;d=h>=0?++g:--g)7>d&&i.push({name:e,x:d,y:c[d]});return i})}],template:'<path ng-path ng-repeat="path in paths(value)" name="{{path.name}}" x="{{path.x}}" y="{{path.y}}"/>',link:function(a,b){return b.attr({transform:"translate("+(a.x||0)+", "+(a.y||0)+")"})}}}),a.directive("ngTimeSignature",function(){return{restrict:"A",scope:{top:"@",bottom:"@",x:"@",y:"@"},template:'<path ng-path name="{{top}}"/><path ng-path name="{{bottom}}" y="2"/>',link:function(a,b){return b.attr({transform:"translate("+(a.x||0)+", "+(a.y||0)+")"})}}}),a.directive("ngStem",function(){return{restrict:"A",scope:{direction:"@"},link:function(a,b){return b.attr({x:"up"===a.direction?1.2512:0,y:"up"===a.direction?-3.5:.1878,width:.13,height:3.3122,ry:.04,fill:"currentColor"})}}}),a.directive("ngNote",function(){return{restrict:"A",scope:{type:"@",stem:"@",x:"@",y:"@"},controller:["$scope",function(a){return a.noteHeadName=function(a){switch(a){case"1":return"wholeNoteHead";case"2":return"halfNoteHead";default:return"solidNoteHead"}}}],template:'<path ng-path name="{{noteHeadName(type)}}"/> <rect ng-stem direction="{{stem}}" ng-hide="type == 1"/>',link:function(a,b){return b.attr({transform:"translate("+(a.x||0)+", "+(a.y||0)+")"})}}}),a.directive("ngPositionedNote",function(){return{restrict:"A",scope:{type:"@",position:"@",x:"@",y:"@"},template:'<g ng-note type="{{type}}" y="{{position}}" stem="{{position > 0 ? \'up\' : \'down\'}}"/>',link:function(a,b){return b.attr({transform:"translate("+(a.x||0)+", "+(a.y||0)+")"})}}}),a.directive("ngBarline",function(){return{restrict:"A",scope:{type:"@",position:"@",size:"@"},link:function(a,b){return b.attr({transform:"translate("+(a.position||0)+", 0)",x:-.19,y:-(a.size||2),width:.19,height:2*(a.size||2),fill:"currentColor"})}}}),a.directive("ngClef",function(){return{restrict:"A",scope:{name:"@",x:"@",y:"@"},template:'<path ng-path name="{{name}}Clef" y="1"/>',link:function(a,b){return b.attr({transform:"translate("+(a.x||0)+", "+(a.y||0)+")"})}}}),a.directive("ngMeasure",function(){return{restrict:"A",scope:{model:"=",measureNum:"=",type:"@",measure:"=",cursor:"=",staff:"="},templateUrl:"../../views/measure.html"}}),a.directive("ngCursor",function(){return{scope:{position:"@",cursorHeight:"@"},link:function(a,b){return b.attr({transform:"translate("+(a.position||0)+", "+(a.cursorHeight/2||0)+")",x:0,y:-.3,width:3,height:.6,fill:"blue"}),a.$watch("cursorHeight",function(c){return b.attr({transform:"translate("+(a.position||0)+", "+(c/2||0)+")"})})}}}),b="http://www.w3.org/2000/svg"}.call(this),function(){var a;a=angular.module("paths",[]),a.factory("paths",function(){return{trebleClef:{d:"M376 262c4 0 9 1 13 1c155 0 256 -128 256 -261c0 -76 -33 -154 -107 -210c-22 -17 -47 -28 -73 -36c3 -35 5 -70 5 -105c0 -19 -1 -39 -2 -58c-7 -120 -90 -228 -208 -228c-108 0 -195 88 -195 197c0 58 53 103 112 103c54 0 95 -47 95 -103c0 -52 -43 -95 -95 -95 c-11 0 -21 2 -31 6c26 -39 68 -65 117 -65c96 0 157 92 163 191c1 18 2 37 2 55c0 31 -1 61 -4 92c-29 -5 -58 -8 -89 -8c-188 0 -333 172 -333 374c0 177 131 306 248 441c-19 62 -37 125 -45 190c-6 52 -7 104 -7 156c0 115 55 224 149 292c3 2 7 3 10 3c4 0 7 0 10 -3 c71 -84 133 -245 133 -358c0 -143 -86 -255 -180 -364c21 -68 39 -138 56 -207zM461 -203c68 24 113 95 113 164c0 90 -66 179 -173 190c24 -116 46 -231 60 -354zM74 28c0 -135 129 -247 264 -247c28 0 55 2 82 6c-14 127 -37 245 -63 364c-79 -8 -124 -61 -124 -119 c0 -44 25 -91 81 -123c5 -5 7 -10 7 -15c0 -11 -10 -22 -22 -22c-3 0 -6 1 -9 2c-80 43 -117 115 -117 185c0 88 58 174 160 197c-14 58 -29 117 -46 175c-107 -121 -213 -243 -213 -403zM408 1045c-99 -48 -162 -149 -162 -259c0 -74 18 -133 36 -194 c80 97 146 198 146 324c0 55 -4 79 -20 129z",scale:{x:.004,y:-.004}},flat:{d:"M27 41l-1 -66v-11c0 -22 1 -44 4 -66c45 38 93 80 93 139c0 33 -14 67 -43 67c-31 0 -52 -30 -53 -63zM-15 -138l-12 595c8 5 18 8 27 8s19 -3 27 -8l-7 -345c25 21 58 34 91 34c52 0 89 -48 89 -102c0 -80 -86 -117 -147 -169c-15 -13 -24 -38 -45 -38 c-13 0 -23 11 -23 25z",scale:{x:.004,y:-.004}},sharp:{d:"M216 -312c0 -10 -8 -19 -18 -19s-19 9 -19 19v145l-83 -31v-158c0 -10 -9 -19 -19 -19s-18 9 -18 19v145l-32 -12c-2 -1 -5 -1 -7 -1c-11 0 -20 9 -20 20v60c0 8 5 16 13 19l46 16v160l-32 -11c-2 -1 -5 -1 -7 -1c-11 0 -20 9 -20 20v60c0 8 5 15 13 18l46 17v158 c0 10 8 19 18 19s19 -9 19 -19v-145l83 31v158c0 10 9 19 19 19s18 -9 18 -19v-145l32 12c2 1 5 1 7 1c11 0 20 -9 20 -20v-60c0 -8 -5 -16 -13 -19l-46 -16v-160l32 11c2 1 5 1 7 1c11 0 20 -9 20 -20v-60c0 -8 -5 -15 -13 -18l-46 -17v-158zM96 65v-160l83 30v160z",scale:{x:.004,y:-.004}},1:{d:"M122 503c18 0 34 -16 53 -16c15 0 29 7 42 13c1 1 3 1 4 1c7 0 12 -7 12 -17v-367c0 -48 28 -94 73 -94c8 0 12 -5 12 -11s-4 -12 -12 -12c-44 0 -87 13 -131 13s-87 -13 -131 -13c-8 0 -12 6 -12 12s4 11 12 11c45 0 73 46 73 94v245c0 12 -9 19 -17 19 c-4 0 -8 -3 -10 -7l-64 -136c-3 -6 -7 -9 -12 -9c-8 0 -16 6 -16 14c0 2 1 5 2 7l117 250c1 2 3 3 5 3z",scale:{x:.004,y:-.004}},2:{d:"M23 11c-1 -7 -6 -11 -11 -11c-6 0 -12 4 -12 11c0 175 235 165 235 344c0 60 -18 122 -70 122c-26 0 -51 -14 -51 -37c0 -27 35 -41 35 -68c0 -38 -30 -69 -68 -69s-69 31 -69 69c0 76 72 128 153 128c96 0 187 -56 187 -145c0 -153 -151 -159 -249 -220c9 2 17 3 26 3 c33 0 70 -11 105 -36c21 -15 46 -23 66 -23c21 0 39 9 44 29c2 6 6 9 11 9c6 0 12 -5 12 -12c0 -67 -90 -105 -138 -105c-36 0 -71 14 -96 44c-13 16 -31 22 -48 22c-30 0 -59 -20 -62 -55z",scale:{x:.004,y:-.004}},3:{d:"M150 477c-29 0 -59 -8 -59 -33c0 -22 36 -25 36 -47c0 -32 -26 -58 -58 -58s-57 26 -57 58c0 65 67 103 138 103c91 0 169 -33 169 -114c0 -43 -4 -82 -42 -100c-9 -4 -14 -12 -14 -21s5 -18 14 -22c41 -19 56 -57 56 -103c0 -92 -79 -140 -179 -140 c-79 0 -154 42 -154 113c0 36 30 66 66 66s65 -30 65 -66c0 -25 -40 -28 -40 -53c0 -27 32 -37 63 -37c49 0 63 61 63 117v16c0 54 -2 94 -50 94h-80c-10 0 -14 8 -14 15s4 14 14 14h80c49 0 50 43 50 99v8c0 54 -18 91 -67 91z",scale:{x:.004,y:-.004}},4:{d:"M204 307c22 14 44 29 60 50c11 15 19 33 27 50c2 4 5 6 9 6c6 0 13 -5 13 -14v-245h72c10 0 15 -7 15 -14s-5 -15 -15 -15h-72v-8c0 -48 27 -94 72 -94c8 0 12 -5 12 -11s-4 -12 -12 -12c-44 0 -87 13 -131 13s-87 -13 -131 -13c-8 0 -12 6 -12 12s4 11 12 11 c45 0 73 46 73 94v8h-167c-23 0 -31 14 -31 23c0 3 1 5 2 6c80 93 138 207 138 330c0 9 6 16 13 16h3c23 -7 47 -13 71 -13s48 6 71 13c2 1 3 1 5 1c11 0 18 -10 12 -17l-284 -330h167v131c0 8 1 17 8 22z",scale:{x:.004,y:-.004}},5:{d:"M46 500c46 -8 91 -13 137 -13s92 5 138 13h4c12 0 19 -10 13 -16c-68 -68 -166 -93 -263 -93c-9 0 -17 -8 -17 -17v-96c28 28 66 43 105 43c116 0 186 -51 186 -161c0 -94 -87 -160 -186 -160c-82 0 -163 39 -163 113c0 36 30 66 66 66s65 -30 65 -66 c0 -25 -40 -28 -40 -53c0 -30 37 -37 72 -37c57 0 70 71 70 137c0 63 -15 132 -70 132c-42 0 -83 -12 -107 -45c-3 -4 -8 -6 -12 -6c-8 0 -15 6 -15 15v228c0 9 7 16 15 16h2z",scale:{x:.004,y:-.004}},6:{d:"M170 256c-51 0 -53 -44 -53 -102v-14v-15c0 -58 2 -102 53 -102c57 0 61 51 61 117s-4 116 -61 116zM117 266c17 7 34 13 53 13c101 0 170 -44 170 -139s-69 -140 -170 -140c-112 0 -170 124 -170 250c0 128 72 250 190 250c71 0 138 -39 138 -103c0 -36 -29 -66 -65 -66 s-66 30 -66 66c0 24 39 25 39 49c0 20 -23 31 -46 31c-66 0 -75 -65 -75 -139c0 -24 2 -48 2 -72z",scale:{x:.004,y:-.004}},7:{d:"M67 410c-31 0 -38 -43 -38 -70v-75c0 -10 -7 -15 -14 -15s-15 5 -15 15v220c0 10 8 15 15 15s14 -5 14 -15v-14c0 -9 12 -19 15 -15c21 29 48 44 78 44c29 0 58 -13 84 -39c12 -12 27 -17 43 -17c30 0 63 19 84 50c3 5 7 6 11 6c8 0 16 -6 16 -14c0 -3 -1 -6 -3 -9 c-83 -118 -158 -249 -158 -387c0 -25 3 -50 8 -76c2 -9 -5 -17 -13 -17c-1 0 -3 1 -4 1c-24 7 -48 15 -73 15s-50 -8 -74 -15c-1 0 -3 -1 -4 -1c-9 0 -16 9 -12 17c54 128 134 242 216 355c-20 -11 -40 -16 -59 -16c-22 0 -42 8 -60 26s-39 31 -57 31z",scale:{x:.004,y:-.004}},8:{d:"M259 288c27 29 49 62 49 102c0 55 -57 87 -117 87c-47 0 -75 -36 -75 -71c0 -20 10 -40 30 -52zM289 271c55 -31 83 -79 83 -127c0 -73 -66 -144 -189 -144c-94 0 -183 54 -183 140c0 50 39 85 76 120c-41 28 -61 67 -61 106c0 68 61 134 176 134c81 0 161 -38 161 -110 c0 -47 -30 -85 -63 -119zM106 242c-33 -29 -62 -59 -62 -102c0 -69 66 -117 139 -117c54 0 86 42 86 83c0 24 -10 48 -35 62z",scale:{x:.004,y:-.004}},wholeNoteHead:{d:"M215 112c-50 0 -69 -43 -69 -88c0 -77 57 -136 134 -136c50 0 69 43 69 88c0 77 -57 136 -134 136zM495 0c0 -43 -35 -76 -73 -97c-53 -30 -113 -41 -174 -41s-122 11 -175 41c-38 21 -73 54 -73 97s35 76 73 97c53 30 114 41 175 41s121 -11 174 -41 c38 -21 73 -54 73 -97z",scale:{x:.004,y:-.004}},halfNoteHead:{d:"M315 65c0 24 -21 41 -42 41c-4 0 -8 0 -12 -1c-31 -9 -77 -40 -114 -64s-84 -53 -104 -78c-7 -8 -11 -18 -11 -28c0 -24 21 -41 42 -41c4 0 8 0 12 1c31 9 78 40 115 64s84 53 104 78c7 8 10 18 10 28zM264 137c47 0 83 -21 83 -72c0 -19 -4 -37 -10 -56 c-12 -38 -32 -74 -65 -96c-54 -36 -113 -51 -188 -51c-47 0 -84 22 -84 73c0 19 5 37 11 56c12 38 31 74 64 96c54 36 114 50 189 50z",scale:{x:.004,y:-.004}},solidNoteHead:{d:"M220 138c56 0 109 -29 109 -91c0 -72 -56 -121 -103 -149c-36 -21 -76 -36 -117 -36c-56 0 -109 29 -109 91c0 72 56 121 103 149c36 21 76 36 117 36z",scale:{x:.004,y:-.004}}}})}.call(this),function(){var a;a=angular.module("leftBar",["musicSVG"]),a.directive("leftBar",function(){return{restrict:"A",require:"ngModel",scope:{ngModel:"="},template:'<svg class="left-bar staff" width="128" height="64" viewBox="0 -4 16 8"> <line ng-line width="16"/> <g ng-key-signature value="{{ngModel.key}}" x="4" y="0"/> <g ng-time-signature top="{{ngModel.time.top}}" bottom="{{ngModel.time.bottom}}" x="12"/> </svg> <br> <svg class="left-bar staff" width="128" height="64" viewBox="0 -4 16 8"> <g ng-staff width="16"/> <path ng-path name="trebleClef" x="1" y="1"/> <g ng-key-signature value="{{ngModel.key}}" x="4" y="-0.5"/> <g ng-time-signature top="{{ngModel.time.top}}" bottom="{{ngModel.time.bottom}}" x="12"/> </svg>',link:function(a){return a.$watch("ngModel",function(){return a.$emit("leftChange",a.ngModel)},!0)}}})}.call(this),function(){var a;a=angular.module("documentView",["musicSVG","actions"]),a.directive("documentView",function(){return{restrict:"A",scope:{score:"=",cursor:"="},controller:["$scope","$element","$compile","Actions",function(a,b,c,d){return a.addMeasure=function(){return a.score.addMeasure()},a.removeMeasure=function(){return a.score.removeMeasure(a.cursor)},a.actions=new d(a.score,a.cursor),a.model={meta:{measures:[{events:{key:7,time:{n:4,d:4}}},{events:{key:-7}}]},staves:[{measures:[{events:{clef:"treble"},notes:[{pitch:5,duration:{n:1,d:4}},{pitch:6,duration:{n:1,d:2}},{pitch:7,duration:{n:1,d:4}}]},{events:{},notes:[{pitch:7,duration:{n:1,d:2}},{pitch:8,duration:{n:1,d:4}},{pitch:9,duration:{n:1,d:4}}]}]}]},b.keydown(function(b){var c;a.$emit("dataChanged"),null!=(c=a.actions.keybindings[b.which])&&(c(),a.$digest())})}],template:'<div class="document"> <div class="staff"> <div ng-measure ng-repeat="measure in score.meta.measures" model="score" measure-num="$index" type="meta" measure="measure" class="measure" cursor="cursor" staff="-1"/> </div> <br> <div class="staff"> <div ng-measure ng-repeat="measure in score.staves[0].measures" model="score" measure-num="$index" type="staff" measure="measure" class="measure" cursor="cursor" staff="0"/> </div> </div>'}})}.call(this),angular.module("lilypondWebApp",["ngRoute","leftBar","documentView","data","actions","lyGenerator"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"partials/main",controller:"MainCtrl"}).when("/about",{templateUrl:"partials/about"}).when("/demo",{templateUrl:"partials/demo"}).when("/download",{templateUrl:"partials/download",controller:"DownloadCtrl"}).otherwise({redirectTo:"/"}),b.html5Mode(!0)}]).controller("MainCtrl",["$scope","data","Actions","generateLy",function(a,b,c,d){return a.lycode='include "english.ly" music = { clef treble key c major \\time 4/4 } score { \\new Staff = "music" music }',a.score=new b.Score,a.cursor=new b.Cursor(a.score),a.actions=new c(a.score,a.cursor),a.selectedKeyboard="qwerty",a.buttonDisplay=function(b){return"qwerty"===a.selectedKeyboard&&(b=a.actions.qwertyToDvorak(b)),a.actions.buttonDisplays[a.actions.bindings[b]]||""},a.keydown=function(b){var c,d;return"function"==typeof(c=a.actions.keybindings[a.selectedKeyboard])[d=b.which]?c[d]():void 0},a.$on("dataChanged",function(){a.$digest(),a.lycode=d(a.score)}),a.leftBarModel={key:0,time:{top:4,bottom:4},staves:[{clef:"treble"}]}}]),function(){var a,b,c,d=function(a,b){return(a%b+ +b)%b};b=angular.module("lyGenerator",[]),b.factory("generateLy",function(){return function(b){var d,e,f,g,h,i,j,k,l,m,n,o,p;for(i='\\include "english.ly"\n',i+="music = {\n",o=b.staves[0].measures,e=k=0,m=o.length;m>k;e=++k){for(g=o[e],null!=(d=g.events.clef)&&(i+="\\clef "+d+"\n"),null!=(f=b.meta.measures[e].events.key)&&(i+="\\key "+a(f)+" \\major\n"),null!=(j=b.meta.measures[e].events.time)&&(i+="\\time "+j.n+"/"+j.d+"\n"),p=g.notes,l=0,n=p.length;n>l;l++)h=p[l],null!=h.duration&&(i+=""+c(h.pitch,b.getKeySignature(e))+h.duration.d+" ");i+="\n"}return i+="}\n",i+='\\score { \\new Staff = "music" \\music }\n'}}),c=function(a,b){var c,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s;if(g="fcgdaeb",f="beadgcf",h={},b>0)for(q=g.slice(0,b),l=0,o=q.length;o>l;l++)c=q[l],h[c]="s";if(0>b)for(r=f.slice(0,-b),m=0,p=r.length;p>m;m++)c=r[m],h[c]="f";for(i=["c","d","e","f","g","a","b"],k=i[d(a,7)]+(h[i[d(a,7)]]||""),j=Math.floor(a/7)+1,e=n=0,s=Math.abs(j);s>=0?s>n:n>s;e=s>=0?++n:--n)k+=0>j?",":"'";return k},a=function(a){var b;return b={"-7":"cf","-6":"gf","-5":"df","-4":"af","-3":"ef","-2":"bf","-1":"f",0:"c",1:"g",2:"d",3:"a",4:"e",5:"b",6:"fs",7:"cs"},b[a]}}.call(this),function(){var a,b={}.hasOwnProperty,c=function(a,c){function d(){this.constructor=a}for(var e in c)b.call(c,e)&&(a[e]=c[e]);return d.prototype=c.prototype,a.prototype=new d,a.__super__=c.prototype,a};a=angular.module("data",[]),a.factory("data",function(){var a;return a={},a.Score=function(){function b(){this.meta={measures:[new a.Measure({key:0,time:{n:4,d:4}})]},this.staves=[{measures:[new a.StaffMeasure({clef:"treble"})]}]}return b.prototype.currentMeasure=function(a){return a.staff<0?this.meta.measures[a.measure]:this.staves[a.staff].measures[a.measure]},b.prototype.addNote=function(a,b){var c,d,e;if(!(a.staff<0||(d=this.getTimeSignature(a.measure),c=function(b,c,d){return null!=c.duration&&d!==a.position?b+c.duration.n/c.duration.d:b},e=1/a.noteType+_(this.currentMeasure(a).notes).reduce(c,0),e>d.n/d.d)))if(this.currentMeasure(a).addNote(a.position,{pitch:6-a.height+(b||0),duration:{n:1,d:a.noteType}}),a.height=a.height-b,e===d.n/d.d){if(a.measure===this.meta.measures.length-1&&this.addMeasure(),null==_(this.currentMeasure(a).notes).last().duration)return this.currentMeasure(a).notes.pop()}else if(null!=_(this.currentMeasure(a).notes).last().duration)return this.currentMeasure(a).addNote(null,{})},b.prototype.removeNote=function(a){var b;if(!(a.staff<0||null==this.currentMeasure(a).notes[a.position].duration)){for(this.currentMeasure(a).removeNote(a.position),(0===this.currentMeasure(a).notes.length||null!=_(this.currentMeasure(a).notes).last().duration)&&this.currentMeasure(a).addNote(null,{}),a.position=Math.min(a.position,Math.max(this.currentMeasure(a).notes.length-1,0)),b=[];null!=_(_(this.staves[0].measures).last().notes).last().duration||null!=this.staves[0].measures[this.staves[0].measures.length-2]&&null==this.staves[0].measures[this.staves[0].measures.length-2].notes[0].duration;)b.push(this.removeMeasure(a));return b}},b.prototype.addEvent=function(a,b){return a.staff<0?this.meta.measures[a.measure].addEvent(b):this.currentMeasure(a).addEvent(b)},b.prototype.removeEvent=function(a,b){return a.staff<0?this.meta.measures[a.measure].removeEvent(b):this.currentMeasure(a).removeEvent(b)},b.prototype.toggleEvent=function(a,b){var c,d;for(d in b)c=d;return null!=this.currentMeasure(a).events[c]?this.removeEvent(a,c):this.addEvent(a,b)},b.prototype.addMeasure=function(){return this.meta.measures.push(new a.Measure),_(this.staves).each(function(b){return b.measures.push(new a.StaffMeasure)})},b.prototype.removeMeasure=function(a){return 1!==this.meta.measures.length?(this.meta.measures.pop(),_(this.staves).each(function(a){return a.measures.pop()}),a.measure=Math.min(a.measure,this.meta.measures.length-1)):void 0},b.prototype.getKeySignature=function(a){for(;0!==a&&null==this.meta.measures[a].events.key;)a--;return this.meta.measures[a].events.key||0},b.prototype.getTimeSignature=function(a){for(;0!==a&&null==this.meta.measures[a].events.time;)a--;return this.meta.measures[a].events.time||{n:4,d:4}},b}(),a.Measure=function(){function a(a){this.events=a||{}}return a.prototype.addEvent=function(a){return _(this.events).extend(a)},a.prototype.removeEvent=function(a){return delete this.events[a]},a}(),a.StaffMeasure=function(a){function b(){b.__super__.constructor.apply(this,arguments),this.notes=[{}]}return c(b,a),b.prototype.addNote=function(a,b){return null==a&&(a=this.notes.length),this.notes[a]=b},b.prototype.removeNote=function(a){return this.notes.splice(a,1)},b}(a.Measure),a.Cursor=function(){function a(a){var b;this.score=a,b=[-1,0,0,0,4],this.staff=b[0],this.measure=b[1],this.position=b[2],this.height=b[3],this.noteType=b[4]}return a.prototype.up=function(){return this.staff>=0?this.height=Math.max(-5,this.height-1):void 0},a.prototype.down=function(){return this.staff>=0?this.height=Math.min(5,this.height+1):void 0},a.prototype.left=function(){return this.position>0?this.position--:this.measure>0?(this.measure--,this.position=this.staff<0?0:Math.max(this.score.staves[this.staff].measures[this.measure].notes.length-1,0)):void 0},a.prototype.right=function(){var a;return this.staff>=0&&this.position<this.score.staves[this.staff].measures[this.measure].notes.length-1?this.position++:this.measure<this.score.meta.measures.length-1?(a=[this.measure+1,0],this.measure=a[0],this.position=a[1],a):void 0},a.prototype.layerUp=function(){var a;return this.staff<0?void 0:(a=[this.staff-1,0,0],this.staff=a[0],this.position=a[1],this.height=a[2],a)},a.prototype.layerDown=function(){var a;return this.staff>=this.score.staves.length-1?void 0:(a=[this.staff+1,0,0],this.staff=a[0],this.position=a[1],this.height=a[2],a)},a.prototype.setNoteType=function(a){var b,c,d;return this.noteType=a,null!=(null!=(c=this.score.currentMeasure(this).notes)&&null!=(d=c[this.position])?d.duration:void 0)?(b=this.height,this.height=-(this.score.currentMeasure(this).notes[this.position].pitch-6),this.score.addNote(this),this.height=b):void 0},a}(),a})}.call(this),function(){var a,b,c,d,e,f;a=angular.module("actions",[]),a.factory("Actions",function(){return function(a,d){var g,h,i,j,k,l,m,n,o,p;for(this.addNote=function(){return a.addNote(d,0)},this.addNote2Above=function(){return a.addNote(d,1)},this.addNote3Above=function(){return a.addNote(d,2)},this.addNote4Above=function(){return a.addNote(d,3)},this.addNote5Above=function(){return a.addNote(d,4)},this.addNote2Below=function(){return a.addNote(d,-1)},this.addNote3Below=function(){return a.addNote(d,-2)},this.addNote4Below=function(){return a.addNote(d,-3)},this.addNote5Below=function(){return a.addNote(d,-4)},this.up3=function(){var a,b,c;for(c=[],a=b=1;3>b;a=++b)c.push(d.up());return c},this.up5=function(){var a,b,c;for(c=[],a=b=1;5>b;a=++b)c.push(d.up());return c},this.up8=function(){var a,b,c;for(c=[],a=b=1;8>b;a=++b)c.push(d.up());return c},this.down3=function(){var a,b,c;for(c=[],a=b=1;3>b;a=++b)c.push(d.down());return c},this.down5=function(){var a,b,c;for(c=[],a=b=1;5>b;a=++b)c.push(d.down());return c},this.down8=function(){var a,b,c;for(c=[],a=b=1;8>b;a=++b)c.push(d.down());return c},this.removeNote=function(){return a.removeNote(d)},this.addTrebleClef=function(){return d.staff<0?void 0:a.toggleEvent(d,{clef:"treble"})},this.addKeySignature=function(){return d.staff<0?a.toggleEvent(d,{key:prompt("Key signature")}):void 0},this.addTimeSignature=function(){return d.staff<0?a.toggleEvent(d,{time:{n:prompt("Time signature numerator"),d:prompt("Time signature denominator")}}):void 0},this.up=function(){return d.up()},this.down=function(){return d.down()},this.left=function(){return d.left()},this.right=function(){return d.right()},this.layerUp=function(){return d.layerUp()},this.layerDown=function(){return d.layerDown()},this.setWholeNote=function(){return d.setNoteType(1)},this.setHalfNote=function(){return d.setNoteType(2)},this.setQuarterNote=function(){return d.setNoteType(4)},this.buttonDisplays={addNote:"add",addNote2Above:"^2nd",addNote3Above:"^3rd",addNote4Above:"^4th",addNote5Above:"^5th",addNote2Below:"v2nd",addNote3Below:"v3rd",addNote4Below:"v4th",addNote5Below:"v5th",up3:f+"3",up5:f+"5",up8:f+"8",down3:b+"3",down5:b+"5",down8:b+"8",removeNote:"del",addTrebleClef:"clef",addKeySignature:"key",addTimeSignature:"time",up:f,down:b,left:c,right:e,layerUp:f+f,layerDown:b+b,setWholeNote:"1/1",setHalfNote:"1/2",setQuarterNote:"1/4"},this.bindings={a:"down8",o:"down5",e:"down3",u:"down",d:"addNote",i:"left",h:"up",t:"up3",n:"up5",s:"up8","delete":"removeNote",",":"addTrebleClef",".":"addKeySignature",p:"addTimeSignature",up:"layerUp",down:"layerDown",left:"left",right:"right",space:"right",j:"layerDown",k:"layerUp",g:"setWholeNote",c:"setHalfNote",r:"setQuarterNote"},i={"delete":8,up:38,down:40,left:37,right:39,",":188,".":190,";":186,"'":222,space:32},n="abcdefghijklmnopqrstuvwxyz",g=l=0,m=n.length;m>l;g=++l)j=n[g],i[j]=65+g;this.keyboardLayouts={dvorak:[";,.pyfgcrl".split(""),"aoeuidhtns".split(""),"'qjkxbmwvz".split("")],qwerty:["qwertyuiop".split(""),"asdfghjkl;".split(""),"zxcvbnm,./".split("")]},this.qwertyToDvorak=function(a){var b,c,d,e,f,g,h,i,j,k;for(k=this.keyboardLayouts.qwerty,f=g=0,i=k.length;i>g;f=++g)for(e=k[f],c=h=0,j=e.length;j>h;c=++h)b=e[c],b===a&&(d=this.keyboardLayouts.dvorak[f][c]);return d||a},this.dvorakToQwerty=function(a){var b,c,d,e,f,g,h,i,j,k;for(k=this.keyboardLayouts.dvorak,f=g=0,i=k.length;i>g;f=++g)for(e=k[f],c=h=0,j=e.length;j>h;c=++h)b=e[c],b===a&&(d=this.keyboardLayouts.qwerty[f][c]);return d||a},this.keybindings={qwerty:{},dvorak:{}},o=this.bindings;for(h in o)k=o[h],this.keybindings.dvorak[i[h]]=this[k];p=this.bindings;for(h in p)k=p[h],this.keybindings.qwerty[i[this.dvorakToQwerty(h)]]=this[k];return this}}),d="♩",f="↑",b="↓",c="←",e="→"}.call(this);