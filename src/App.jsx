import React, { useEffect, useRef, useState } from 'react';
import { isSupabaseConfigured, supabase } from './lib/supabase.js';
import './poster.css';

const confettiColors = ['#392D39', '#FFCED8', '#FFDDDD', '#FFE8C4', '#FFF4DE'];

function ConfettiBurst() {
  const [visible, setVisible] = useState(true);
  const [pieces] = useState(() => Array.from({ length: 72 }, (_, index) => ({
    left: `${Math.random() * 100}vw`,
    drift: `${Math.round(Math.random() * 340 - 170)}px`,
    spin: `${Math.round(Math.random() * 1080 - 540)}deg`,
    duration: `${2.4 + Math.random() * 1.5}s`,
    delay: `${Math.random() * 0.55}s`,
    width: `${6 + Math.round(Math.random() * 7)}px`,
    height: `${9 + Math.round(Math.random() * 10)}px`,
    color: confettiColors[index % confettiColors.length],
    round: index % 3 === 0,
  })));

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 4700);
    return () => clearTimeout(timeout);
  }, []);

  if (!visible) return null;
  return <div className="confetti-burst" aria-hidden="true">
    {pieces.map((piece, index) => <i key={index} className={piece.round ? 'confetti-piece confetti-piece-round' : 'confetti-piece'} style={{
      left: piece.left,
      width: piece.width,
      height: piece.height,
      backgroundColor: piece.color,
      '--drift': piece.drift,
      '--spin': piece.spin,
      '--duration': piece.duration,
      '--delay': piece.delay,
    }} />)}
  </div>;
}

const initialEvent = {
  title: 'Teacher Raksa',
  date: '2026-11-09',
  time: '18:30',
  location: 'Autumn (Age: 18+)',
  message: 'A little evening of good food, lovely people, and a very special birthday. We would love to celebrate with you!',
};

function applyEventUpdates(event) {
  return { ...event, time: event.time?.slice(0, 5) === '17:30' ? '18:30' : event.time, location: 'Autumn (Age: 18+)' };
}

const memories = [
  { src: '/memories/raksa-cake.png', alt: 'Teacher Raksa holding her birthday cake', caption: 'A wish, a cake, and the birthday girl' },
  { src: '/memories/birthday-table.png', alt: 'Friends gathered around the birthday dinner table', caption: 'All our favorite people in one place' },
  { src: '/memories/friends-together.png', alt: 'Friends smiling together at last year’s celebration', caption: 'The kind of night we want to do again' },
  { src: '/memories/friends-cooking.png', alt: 'Friends posing together in the kitchen while preparing food', caption: 'A little kitchen teamwork' },
  { src: '/memories/cake-tasting.png', alt: 'Two friends tasting birthday cake together', caption: 'Cake tasting, birthday style' },
  { src: '/memories/birthday-group.png', alt: 'A group of students gathered around a birthday cake', caption: 'Celebrating together, one more time' },
];

function formatDate(value) {
  if (!value) return 'Date to be confirmed';
  const date = new Date(`${value}T12:00:00`);
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

function formatTime(value) {
  if (!value) return 'Time to be confirmed';
  const normalized = value.length === 5 ? `${value}:00` : value;
  return new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(new Date(`2026-01-01T${normalized}`));
}

function Countdown({ date, time }) {
  const [remaining, setRemaining] = useState(null);

  useEffect(() => {
    if (!date || !time) return;
    const target = new Date(`${date}T${time.length === 5 ? `${time}:00` : time}`);
    const update = () => setRemaining(Math.max(0, target.getTime() - Date.now()));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [date, time]);

  if (remaining === null) return null;
  if (remaining === 0) return <p className="countdown-ended">The celebration is underway!</p>;

  const seconds = Math.floor(remaining / 1000);
  const units = [
    ['days', Math.floor(seconds / 86400)],
    ['hours', Math.floor((seconds % 86400) / 3600)],
    ['minutes', Math.floor((seconds % 3600) / 60)],
    ['seconds', seconds % 60],
  ];

  return <div className="countdown" role="timer" aria-label="Time remaining until the celebration">
    {units.map(([label, value]) => <div className="countdown-unit" key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>)}
  </div>;
}

function PartyMark({ className = '' }) {
  return <svg className={className} viewBox="0 0 68 68" fill="none" aria-hidden="true">
    <path d="M34 4c-3 8-3 14 0 19 3-5 3-11 0-19Z" fill="#FFCED8" />
    <path d="M34 23c-3-7-8-11-15-12 2 7 7 11 15 12Z" fill="#FFDDDD" />
    <path d="M34 23c3-7 8-11 15-12-2 7-7 11-15 12Z" fill="#FFDDDD" />
    <path d="m34 22 3 30-3 11-3-11 3-30Z" fill="#FFE8C4" />
    <path d="M21 35c8-7 18-8 27-3M21 42c8-7 17-8 27-3" stroke="#FFF4DE" strokeWidth="2" strokeLinecap="round" />
    <circle cx="34" cy="31" r="2" fill="#FFF4DE" />
  </svg>;
}

function Bow({ className = '' }) {
  return <svg className={className} viewBox="0 0 54 34" fill="none" aria-hidden="true">
    <path d="M25 16C13 2 3 4 4 13c1 7 10 8 21 5ZM29 16C41 2 51 4 50 13c-1 7-10 8-21 5Z" fill="#FFCED8" stroke="#8E526B" strokeWidth="1.6" />
    <path d="m24 19-5 13 9-6 7 6-4-13" fill="#FFCED8" stroke="#8E526B" strokeWidth="1.4" strokeLinejoin="round" />
    <circle cx="27" cy="17" r="4" fill="#FFE8C4" stroke="#8E526B" strokeWidth="1.5" />
  </svg>;
}

function WishSticker({ kind }) {
  if (kind === 'flower') return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <circle cx="24" cy="12" r="7" fill="#FFCED8" /><circle cx="34" cy="19" r="7" fill="#FFCED8" />
    <circle cx="30" cy="31" r="7" fill="#FFCED8" /><circle cx="18" cy="31" r="7" fill="#FFCED8" />
    <circle cx="14" cy="19" r="7" fill="#FFCED8" /><circle cx="24" cy="22" r="5" fill="#FFE8C4" />
    <path d="M24 36v8m0-4c-4-4-7-3-9-2m9 2c4-4 7-3 9-2" stroke="#FFE8C4" strokeWidth="2" strokeLinecap="round" />
  </svg>;
  if (kind === 'cake') return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <path d="M11 24h26v17H11z" fill="#FFDDDD" stroke="#8E526B" strokeWidth="1.7" />
    <path d="M11 28c4-4 7 4 11 0s7 4 11 0 4 0 4 0" stroke="#FFF4DE" strokeWidth="3" strokeLinecap="round" />
    <path d="M24 24V12" stroke="#392D39" strokeWidth="2" strokeLinecap="round" /><path d="M24 7c-4 4 3 5 0 9 5-3 4-7 0-9Z" fill="#FFE8C4" />
    <circle cx="18" cy="34" r="1.5" fill="#FFDDDD" /><circle cx="30" cy="35" r="1.5" fill="#FFDDDD" />
    <path d="M8 42h32" stroke="#FFE8C4" strokeWidth="2" strokeLinecap="round" />
  </svg>;
  if (kind === 'bow') return <Bow />;
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <path d="m24 4 4.8 14.3L44 24l-15.2 5.7L24 44l-4.8-14.3L4 24l15.2-5.7L24 4Z" fill="#FFE8C4" />
    <circle cx="9" cy="9" r="2.5" fill="#FFE8C4" /><circle cx="39" cy="39" r="2.5" fill="#FFDDDD" />
    <path d="M38 8v6m-3-3h6M10 36v6m-3-3h6" stroke="#8E526B" strokeWidth="1.7" strokeLinecap="round" />
  </svg>;
}

const wishDecorations = ['flower', 'cake', 'bow', 'star'];
const wishColorPairs = [
  ['#e99ab1', '#fff4de'],
  ['#b9a4d8', '#ffe8c4'],
  ['#f2a47e', '#fff4de'],
  ['#a9c9a5', '#ffdddd'],
  ['#92bed8', '#ffe8c4'],
  ['#e8c36e', '#fff4de'],
];

function wishDecorationFor(id) {
  const key = String(id ?? 'birthday');
  const hash = [...key].reduce((total, character) => (total * 31 + character.charCodeAt(0)) >>> 0, 7);
  return wishDecorations[hash % wishDecorations.length];
}

function wishColorsFor(id, index) {
  const key = String(id ?? 'birthday');
  const hash = [...key].reduce((total, character) => (total * 31 + character.charCodeAt(0)) >>> 0, 7);
  const [envelope, stamp] = wishColorPairs[(hash + index) % wishColorPairs.length];
  return { envelope, stamp };
}

function Sprinkles({ className = '' }) {
  return <svg className={className} viewBox="0 0 160 80" fill="none" aria-hidden="true">
    <path d="M21 17v12m-5-6h10M135 48v12m-5-6h10M74 8v8m-4-4h8M51 57v12m-5-6h10" stroke="#FFE8C4" strokeWidth="2" strokeLinecap="round" />
    <circle cx="111" cy="20" r="3" fill="#FFDDDD" /><circle cx="94" cy="58" r="3" fill="#FFDDDD" /><circle cx="31" cy="52" r="2.5" fill="#FFE8C4" />
  </svg>;
}

function SupabaseNote() {
  return <p className="setup-note">The shared birthday wish book is not connected yet. Follow the <a href="/setup.html">setup guide</a> to enable it.</p>;
}

function WishBoard({ wishes, loadingWishes, wishError, configured }) {
  const [openedWish, setOpenedWish] = useState(null);
  const wishDialog = useRef(null);

  useEffect(() => {
    const dialog = wishDialog.current;
    if (!dialog) return;
    if (openedWish && !dialog.open) dialog.showModal();
    else if (!openedWish && dialog.open) dialog.close();
  }, [openedWish]);

  return <section className="wishes-section" aria-labelledby="wishes-title">
    <div className="wishes-heading"><div><div className="tiny-ornament"><span></span> Messages for Teacher Raksa <span></span></div><h2 id="wishes-title">Birthday <em>wishes.</em></h2><p>Choose an envelope to open a birthday note.</p></div><span className="wish-count" aria-label={`${wishes.length} ${wishes.length === 1 ? 'wish' : 'wishes'}`}>{wishes.length} <i>{wishes.length === 1 ? 'wish' : 'wishes'}</i></span></div>
    {!configured && <p className="wishes-empty">Connect the shared wish book to see messages from everyone.</p>}
    {wishError && <p className="wishes-error" role="alert">{wishError}</p>}
    {loadingWishes && configured && <p className="wishes-empty">Gathering the birthday wishes…</p>}
    {!loadingWishes && configured && !wishError && wishes.length === 0 && <p className="wishes-empty">The wish book is waiting for its first lovely note.</p>}
    {wishes.length > 0 && <div className="wish-book">
      <div className="wish-scroll" role="region" aria-label="Birthday wishes" tabIndex="0">
        <ol className="wish-list">{wishes.map((entry, index) => {
          const decoration = wishDecorationFor(entry.id);
          const colors = wishColorsFor(entry.id, index);
      return <li className={`wish-entry wish-entry-${decoration}`} key={entry.id}>
        <button className="wish-envelope" type="button" style={{ '--envelope-color': colors.envelope, '--stamp-color': colors.stamp }} onClick={() => setOpenedWish(entry)} aria-label={`Open birthday wish from ${entry.display_name}`}>
          <svg className="envelope-art" viewBox="0 0 160 112" fill="none" aria-hidden="true"><rect x="8" y="13" width="144" height="91" rx="5" fill="var(--envelope-color)" stroke="currentColor" strokeOpacity=".24" strokeWidth="1.5"/><path d="M12 30 80 77l68-47" fill="var(--envelope-color)" opacity=".92"/><path d="M12 31 76 76a7 7 0 0 0 8 0l64-45" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/><path d="M12 35v61a5 5 0 0 0 5 5h126a5 5 0 0 0 5-5V35L89 82a15 15 0 0 1-18 0L12 35Z" fill="var(--envelope-color)" opacity=".96"/><path d="m14 98 43-38m89 38-43-38" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
          <span className="envelope-seal" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="m12 2.5 2.55 6.1 6.6.5-5.05 4.25 1.6 6.45L12 16.25l-5.7 3.55 1.6-6.45L2.85 9.1l6.6-.5L12 2.5Z" fill="currentColor" stroke="#fff4de" strokeWidth="1.1" strokeLinejoin="round"/></svg></span>
        </button>
        <p className="envelope-sender"><span>From</span> <strong>{entry.display_name}</strong></p>
      </li>;
        })}</ol>
      </div>
      {wishes.length > 4 && <p className="wish-scroll-hint"><span aria-hidden="true">↓</span> More wishes below — scroll inside to read all {wishes.length}</p>}
    </div>}
    <dialog className="wish-dialog" ref={wishDialog} aria-labelledby="wish-dialog-title" onCancel={() => setOpenedWish(null)} onClick={(event) => { if (event.target === event.currentTarget) setOpenedWish(null); }}>
      {openedWish && <div className="wish-card">
        <button className="wish-dialog-close" type="button" onClick={() => setOpenedWish(null)} aria-label="Close birthday wish">×</button>
        <div className="wish-card-sticker"><WishSticker kind={wishDecorationFor(openedWish.id)} /></div>
        <p className="wish-card-label" id="wish-dialog-title">A little birthday note for you</p>
        <blockquote>{openedWish.wish}</blockquote>
        <p className="wish-card-from">With love, <strong>{openedWish.display_name}</strong></p>
      </div>}
    </dialog>
  </section>;
}

function Invitation() {
  const [event, setEvent] = useState(initialEvent);
  const [form, setForm] = useState({ fullName: '', wish: '', website: '' });
  const [wishes, setWishes] = useState([]);
  const [loadingWishes, setLoadingWishes] = useState(true);
  const [wishError, setWishError] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [confettiKey, setConfettiKey] = useState(0);
  const knownWishIds = useRef(null);

  function celebrateWish() {
    setConfettiKey((key) => key + 1);
  }

  useEffect(() => {
    document.title = `${event.title}'s Birthday`;
  }, [event.title]);

  useEffect(() => {
    if (!supabase) return;
    supabase.from('event_details').select('title, date, time, location, message').eq('id', 'main').maybeSingle()
      .then(({ data }) => { if (data) setEvent(applyEventUpdates(data)); });
  }, []);

  useEffect(() => {
    if (!supabase) { setLoadingWishes(false); return; }
    let active = true;
    const loadWishes = async () => {
      const { data, error } = await supabase.from('birthday_wishes').select('id, display_name, wish, created_at').order('created_at', { ascending: false }).limit(100);
      if (!active) return;
      if (error) setWishError('We could not load the wishes. Check that the wish book table is set up, then refresh the page.');
      else {
        const nextWishes = data ?? [];
        if (knownWishIds.current === null) knownWishIds.current = new Set(nextWishes.map((wish) => wish.id));
        else {
          const knownIds = knownWishIds.current;
          if (nextWishes.some((wish) => !knownIds.has(wish.id))) celebrateWish();
          nextWishes.forEach((wish) => knownIds.add(wish.id));
        }
        setWishes(nextWishes);
        setWishError('');
      }
      setLoadingWishes(false);
    };
    loadWishes();
    const refresh = setInterval(loadWishes, 30000);
    return () => { active = false; clearInterval(refresh); };
  }, []);

  function changeForm(eventObject) {
    setForm((current) => ({ ...current, [eventObject.target.name]: eventObject.target.value }));
  }

  async function submitRsvp(eventObject) {
    eventObject.preventDefault();
    setMessage('');
    if (form.website) { setStatus('success'); setMessage('Your birthday wish is on the board.'); return; }
    if (!supabase) { setStatus('error'); setMessage('The shared wish book is not set up yet. Please try again later.'); return; }
    setStatus('saving');
    const { data, error } = await supabase.from('birthday_wishes').insert({
      display_name: form.fullName.trim(),
      wish: form.wish.trim(),
    }).select('id, display_name, wish, created_at').single();
    if (error) {
      setStatus('error');
      setMessage('We could not save your wish just now. Please check your connection and try again.');
      return;
    }
    setWishes((current) => [data, ...current].slice(0, 100));
    if (knownWishIds.current) knownWishIds.current.add(data.id);
    celebrateWish();
    setStatus('success');
    setMessage('Your birthday wish is on the board.');
    setForm({ fullName: '', wish: '', website: '' });
  }

  const wishForm = <form className="rsvp-form" onSubmit={submitRsvp}>
        <div className="form-ornament" aria-hidden="true"><WishSticker kind="flower" /></div>
        <label>Your name<input name="fullName" autoComplete="name" placeholder="The name your friends call you" value={form.fullName} onChange={changeForm} maxLength="80" required /></label>
        <label>Your birthday wish<textarea name="wish" placeholder="A little wish for Teacher Raksa…" value={form.wish} onChange={changeForm} maxLength="500" rows="4" required /></label>
        <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="website" tabIndex="-1" autoComplete="off" value={form.website} onChange={changeForm} /></label></div>
        <button className="button button-primary submit-button" disabled={!isSupabaseConfigured || status === 'saving'}>{!isSupabaseConfigured ? 'Shared wishes coming soon' : status === 'saving' ? 'Adding your wish…' : 'Share your wish'} <span aria-hidden="true">↗</span></button>
        <p className="form-status" role="status" aria-live="polite">{message}</p>
        <p className="privacy-note">Your name and wish will be visible to everyone who visits this page.</p>
        {!isSupabaseConfigured && <p className="setup-note">The shared wish book is not connected yet. Follow the <a href="/setup.html">setup guide</a> to enable it.</p>}
      </form>;


  return <>
  <main className="invitation-page">
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Teacher Raksa's birthday home"><PartyMark /> <span>Raksa's day</span></a>
      <nav aria-label="Main navigation"><a href="#details">The details</a><a href="/poster">Invitation poster</a><a href="#memories">Last year's moments</a><a className="nav-cta" href="#rsvp">Leave a wish <span aria-hidden="true">↗</span></a></nav>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy">
        <div className="tiny-ornament"><span></span> A little celebration for someone lovely <span></span></div>
        <h1>Make a wish,<br /><em>{event.title}!</em></h1>
        <p className="hero-intro">{event.message}</p>
        <a className="button button-primary" href="#rsvp">Write a birthday wish <span aria-hidden="true">↗</span></a>
        <p className="soft-note">Good company, a little cake, and you. That's the whole plan.</p>
        <Sprinkles className="hero-sprinkles" />
      </div>
      <div className="hero-photo-wrap">
        <div className="hero-photo-frame"><img src={memories[0].src} alt={memories[0].alt} /></div>
        <div className="photo-sticker"><Bow /><span>the<br />birthday<br />girl!</span></div>
        <svg className="orbit orbit-one" viewBox="0 0 420 370" fill="none" aria-hidden="true"><path d="M2 196C2 91 88 6 196 6c100 0 188 77 211 177" stroke="#FFCED8" strokeWidth="1.3" strokeDasharray="3 6"/><circle cx="409" cy="183" r="5" fill="#FFDDDD"/><path d="M14 206c8 85 58 126 120 149" stroke="#FFE8C4" strokeWidth="1.3" strokeDasharray="3 6" /></svg>
      </div>
      <div className="hero-stamp" aria-hidden="true"><span>made with</span><strong>love</strong><i>✳</i></div>
    </section>

    <section className="event-details" id="details" aria-labelledby="details-title">
      <div className="details-heading"><PartyMark className="small-mark" /><h2 id="details-title">Put it in your diary</h2><p>The important bits, tied up with a bow.</p></div>
      <div className="detail-rule"></div>
      <div className="detail-items">
        <div><span className="detail-label">The day</span><strong>{formatDate(event.date)}</strong></div>
        <div><span className="detail-label">The time</span><strong>{formatTime(event.time)}</strong></div>
        <div><span className="detail-label">The place</span><strong>{event.location || 'To be confirmed'}</strong></div>
      </div>
      <div className="booking-details" aria-label="Booking details">
        <h3>Booking details</h3>
        <dl>
          <div><dt>Booked name</dt><dd>Horng</dd></div>
          <div><dt>Phone number</dt><dd><a href="tel:011397567">011 397 567</a></dd></div>
        </dl>
      </div>
      <Countdown date={event.date} time={event.time} />
      <a href="https://maps.app.goo.gl/sexuKyrArGh79fqN8" className="text-link" target="_blank" rel="noreferrer">View the location <span aria-hidden="true">↗</span></a>
    </section>

    <section className="rsvp-section" id="rsvp">
      <div className="rsvp-copy"><div className="tiny-ornament"><span></span> Leave a little love <span></span></div><h2>One little<br /><em>birthday wish.</em></h2><p>Add a note for Teacher Raksa. Your wish will join the shared guestbook below for everyone to read.</p><div className="rsvp-doodle"><PartyMark /><span>Words to keep<br />close to heart</span></div></div>
      {wishForm}
    </section>

    <WishBoard wishes={wishes} loadingWishes={loadingWishes} wishError={wishError} configured={isSupabaseConfigured} />

    <section className="memories-section" id="memories">
      <div className="memories-heading"><div><div className="tiny-ornament"><span></span> A little look back <span></span></div><h2>Last year, <em>like this.</em></h2><p>Some favorite faces from last time around.</p></div><span className="memory-count">{String(memories.length).padStart(2, '0')} <i>little moments</i></span></div>
      <div className="memory-gallery">{memories.map((photo, index) => <figure className={`memory memory-${index + 1}`} key={photo.src}><div className="memory-photo"><img src={photo.src} alt={photo.alt} loading="lazy" /></div><figcaption><span>0{index + 1}</span>{photo.caption}</figcaption></figure>)}</div>
    </section>

    <footer className="site-footer"><a className="brand" href="#top"><PartyMark /> <span>Raksa's day</span></a><p>Made with love, for one very lovely teacher.</p><a href="#rsvp">Leave a wish <span aria-hidden="true">↗</span></a></footer>
  </main>
  {confettiKey > 0 && <ConfettiBurst key={confettiKey} />}
  </>;
}

function Admin() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [login, setLogin] = useState({ email: '', password: '' });
  const [event, setEvent] = useState(initialEvent);
  const [rsvps, setRsvps] = useState([]);
  const [status, setStatus] = useState('');
  const [eventError, setEventError] = useState('');
  const [guestError, setGuestError] = useState('');
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [loadingGuests, setLoadingGuests] = useState(false);

  async function loadAdminData() {
    setLoadingEvent(true);
    setLoadingGuests(true);
    const [eventResult, guestResult] = await Promise.all([
      supabase.from('event_details').select('title, date, time, location, message').eq('id', 'main').single(),
      supabase.from('rsvps').select('id, full_name, contact, guest_count, note, created_at').order('created_at', { ascending: false }),
    ]);
    if (eventResult.error) setEventError('Could not load event details. Refresh the page before editing.');
    else if (eventResult.data) { setEvent(applyEventUpdates(eventResult.data)); setEventError(''); }
    setLoadingEvent(false);
    if (guestResult.error) { setGuestError('Could not load registrations. Refresh the page to try again.'); setRsvps([]); }
    else { setGuestError(''); setRsvps(guestResult.data ?? []); }
    setLoadingGuests(false);
  }

  useEffect(() => {
    if (!supabase) { setChecking(false); return; }
    supabase.auth.getSession().then(({ data }) => {
      const current = data.session;
      if (current?.user.app_metadata?.is_admin === true) { setSession(current); loadAdminData(); }
      else if (current) supabase.auth.signOut();
      setChecking(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (nextSession?.user.app_metadata?.is_admin === true) { setSession(nextSession); loadAdminData(); }
      else setSession(null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function signIn(eventObject) {
    eventObject.preventDefault(); setStatus('Signing in…');
    if (!supabase) return setStatus('Add the Supabase settings before signing in.');
    const { data, error } = await supabase.auth.signInWithPassword(login);
    if (error) return setStatus('We could not sign you in. Check your email and password.');
    if (data.user.app_metadata?.is_admin !== true) { await supabase.auth.signOut(); return setStatus('This account does not have administrator access.'); }
    setSession(data.session); setStatus(''); await loadAdminData();
  }

  async function saveEvent(eventObject) {
    if (eventError || loadingEvent) return;
    eventObject.preventDefault(); setStatus('Saving event details…');
    const { error } = await supabase.from('event_details').update({ ...event, updated_at: new Date().toISOString() }).eq('id', 'main');
    setStatus(error ? 'Could not save changes. Please try again.' : 'Your event details are saved.');
    if (!error) setEventError('');
  }

  async function signOut() { await supabase.auth.signOut(); setSession(null); }

  if (!isSupabaseConfigured) return <main className="admin-page"><header className="admin-top"><a href="/" className="brand"><PartyMark /><span>Raksa's day</span></a><span>Event admin</span></header><section className="admin-message"><PartyMark /><h1>Admin setup needed</h1><p>Connect the Supabase project and run the database setup in the project guide before signing in or viewing registrations.</p><a className="button button-primary" href="/">Back to the invitation</a><a className="admin-help" href="/setup.html">Read the setup guide</a></section></main>;

  if (checking) return <main className="admin-page"><p className="admin-loading">Checking your admin access…</p></main>;
  if (!session) return <main className="admin-page"><header className="admin-top"><a href="/" className="brand"><PartyMark /><span>Raksa's day</span></a><span>Event admin</span></header><section className="admin-login"><p className="admin-overline">A little backstage access</p><h1>Welcome back.</h1><p>Sign in to update the celebration details and see who's coming.</p><form onSubmit={signIn}>
    <label>Email<input type="email" autoComplete="username" value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} required /></label>
    <label>Password<input type="password" autoComplete="current-password" value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} required /></label>
    <button className="button button-primary">Sign in <span aria-hidden="true">↗</span></button><p className="form-status" role="status">{status}</p>
    {!isSupabaseConfigured && <SupabaseNote />}
  </form><a className="admin-help" href="/">← Back to invitation</a></section></main>;

  return <main className="admin-page"><header className="admin-top"><a href="/" className="brand"><PartyMark /><span>Raksa's day</span></a><div className="admin-actions"><span>Signed in as {session.user.email}</span><button className="quiet-button" onClick={signOut}>Sign out</button></div></header>
    <div className="admin-dashboard"><div className="dashboard-title"><div><p className="admin-overline">A little backstage access</p><h1>The party plan</h1><p>Update the invitation and keep an eye on who's joining.</p></div><a href="/" className="text-link">View invitation ↗</a></div>
      {eventError && <p className="admin-error" role="alert">{eventError}</p>}
      <section className="admin-panel"><h2>Event details</h2><form className="event-editor" onSubmit={saveEvent}>
        <label>Birthday name shown on the invitation<input value={event.title} onChange={(e) => setEvent({ ...event, title: e.target.value })} required maxLength="60" /></label>
        <div className="editor-pair"><label>Date<input type="date" value={event.date} onChange={(e) => setEvent({ ...event, date: e.target.value })} required /></label><label>Time<input type="time" value={event.time} onChange={(e) => setEvent({ ...event, time: e.target.value })} required /></label></div>
        <label>Location<input value={event.location} onChange={(e) => setEvent({ ...event, location: e.target.value })} required maxLength="180" /></label>
        <label>Invitation message<textarea rows="3" value={event.message} onChange={(e) => setEvent({ ...event, message: e.target.value })} maxLength="400" /></label>
        <div className="editor-bottom"><button className="button button-primary" disabled={Boolean(eventError) || loadingEvent}>{loadingEvent ? 'Loading event details…' : 'Save event details'}</button><p className="form-status" role="status">{status}</p></div>
      </form></section>
      <section className="admin-panel guest-panel"><div className="guest-heading"><div><h2>Who's coming</h2><p>Guest details are visible only to the event admin.</p></div><div className="guest-total"><strong>{guestError ? '—' : rsvps.length}</strong><span>RSVPs</span></div></div>
        {guestError ? <p className="admin-error" role="alert">{guestError}</p> : loadingGuests ? <p className="empty-guests">Loading the guest list…</p> : rsvps.length === 0 ? <p className="empty-guests">No RSVPs yet. Your first guest might be just around the corner.</p> : <div className="guest-table-wrap"><table><thead><tr><th>Name</th><th>Contact</th><th>Seats</th><th>Note</th><th>Registered</th></tr></thead><tbody>{rsvps.map((guest) => <tr key={guest.id}><td>{guest.full_name}</td><td>{guest.contact}</td><td>{guest.guest_count}</td><td>{guest.note || '—'}</td><td>{new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(new Date(guest.created_at))}</td></tr>)}</tbody></table></div>}
      </section>
      <p className="admin-privacy">Guest contact information is private and should only be used to organize the birthday celebration.</p>
    </div>
  </main>;
}

function Poster() {
  const [event, setEvent] = useState(initialEvent);

  useEffect(() => {
    document.title = `Invitation poster · ${event.title}`;
  }, [event.title]);

  useEffect(() => {
    if (!supabase) return;
    supabase.from('event_details').select('title, date, time, location, message').eq('id', 'main').maybeSingle()
      .then(({ data }) => { if (data) setEvent(applyEventUpdates(data)); });
  }, []);

  return <main className="poster-page">
    <div className="poster-tools"><a href="/" className="poster-back">← Back to the invitation</a><button className="poster-print" type="button" onClick={() => window.print()}>Print or save as PDF</button></div>
    <article className="birthday-poster" aria-labelledby="poster-title">
      <div className="poster-frame">
        <header className="poster-header"><PartyMark className="poster-mark" /><p>With love, you’re invited</p></header>
        <figure className="poster-photo"><img src="/memories/raksa-cake.png" alt="Teacher Raksa celebrating with her birthday cake" /></figure>
        <div className="poster-copy">
          <p className="poster-kicker">A birthday gathering for</p>
          <h1 id="poster-title">{event.title}</h1>
          <p className="poster-message">{event.message}</p>
          <p className="poster-invitation">Join us for an evening of celebration</p>
        </div>
        <div className="poster-divider" aria-hidden="true"><span></span><PartyMark /><span></span></div>
        <dl className="poster-details">
          <div><dt>Date</dt><dd>{formatDate(event.date)}</dd></div>
          <div><dt>Time</dt><dd>{formatTime(event.time)}</dd></div>
          <div><dt>Venue</dt><dd>{event.location || 'To be confirmed'}</dd></div>
        </dl>
        <a className="poster-map" href="https://maps.app.goo.gl/sexuKyrArGh79fqN8" target="_blank" rel="noreferrer">Open venue directions <span aria-hidden="true">↗</span></a>
        <footer className="poster-footer">We’d love to celebrate with you <span aria-hidden="true">✦</span></footer>
      </div>
    </article>
  </main>;
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '');
  if (path === '/admin') return <Admin />;
  if (path === '/poster') return <Poster />;
  return <Invitation />;
}
