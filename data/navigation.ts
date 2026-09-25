import { visibleLocations } from './locations';
const featured = [
 {slug:'istanbul',description:'İki yaka, tek iletişim noktası.'},
 {slug:'sakarya',description:'Şehir içinde ve yolculuğunuzda.'},
 {slug:'sakarya/sapanca',description:'Tatil yolunda da yanınızda.'},
 {slug:'kocaeli',description:'Konumunuza göre yönlendirme.'},
 {slug:'duzce',description:'Yolunuza devam etmeniz için.'},
];
export const featuredLocations=featured.flatMap(item=>{
 const location=visibleLocations.find(l=>l.slug===item.slug);
 return location?[{...item,name:location.district||location.city,highlight:location.slug==='sakarya/sapanca'}]:[];
});
