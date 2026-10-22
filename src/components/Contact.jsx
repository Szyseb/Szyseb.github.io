import {Mail} from 'lucide-react';
import {email} from '../content.js';
export default function Contact(){
 return <section className="contact-section" id="kontakt"><div className="section-title"><div><span className="eyebrow">KONTAKT</span><h2>Napisz.</h2></div><span className="section-caption">Pytanie, pomysł albo projekt.</span></div><a className="contact-card" href={`mailto:${email}`}><span className="contact-icon"><Mail size={27} strokeWidth={1.2}/></span><span className="contact-copy"><small>E-MAIL</small><strong>{email}</strong></span><span className="contact-arrow">↗</span></a></section>;
}
