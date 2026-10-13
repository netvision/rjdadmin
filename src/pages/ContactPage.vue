<template>
  <main class="contact-page">
    <div class="site-shell">
      <header class="page-heading">
        <span class="eyebrow">Start a conversation</span>
        <h1 class="title1">Let's connect.</h1>
        <p>Visit us in Chirawa or get in touch by phone. We would be glad to hear from you.</p>
      </header>
      <div class="contact-page__grid">
        <div class="contact-page__card">
          <span class="contact-page__icon"><q-icon name="place" size="25px" /></span>
          <h2>Find us</h2>
          <address>
            Ramkrishna Jaidayal Dalmia Seva Sansthan<br />
            Dalmia Sports Complex<br />
            Station Road, Chirawa<br />
            Rajasthan 333026
          </address>
        </div>
        <div class="contact-page__card">
          <span class="contact-page__icon"><q-icon name="call" size="25px" /></span>
          <h2>Call us</h2>
          <a href="tel:+911596221109">01596-221109</a>
          <a href="tel:+919928020502">9928020502</a>
          <p>We are based in Chirawa, Jhunjhunu district.</p>
        </div>
      </div>
      <div class="contact-page__image">
        <img src="/images/slide4.jpg" alt="Community gathering in a Chirawa village" loading="lazy" />
        <div><span class="eyebrow eyebrow--light">Our home</span><strong>Chirawa, Rajasthan</strong></div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.contact-page { padding-bottom: 5rem; }
.contact-page__grid { display: grid; gap: 1rem; }
.contact-page__card { min-height: 16rem; padding: 1.8rem; border: 1px solid var(--line); border-radius: .5rem; background: var(--paper); }
.contact-page__icon { display: grid; place-items: center; width: 3rem; height: 3rem; border-radius: 50%; background: var(--mint); color: var(--teal); }
.contact-page__card h2 { margin: 1.3rem 0 .8rem; color: var(--forest); font-family: var(--display); font-size: 2rem; }
.contact-page__card address { color: var(--muted); font-style: normal; line-height: 1.8; }
.contact-page__card a { display: block; width: fit-content; margin-bottom: .5rem; color: var(--teal); font-size: 1.15rem; font-weight: 700; text-decoration: none; }
.contact-page__card p { color: var(--muted); }
.contact-page__image { position: relative; height: 17rem; margin-top: 1.5rem; overflow: hidden; border-radius: .5rem; background: var(--forest); }
.contact-page__image::after { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(7,45,36,.8), transparent 75%); content: ""; }
.contact-page__image img { width: 100%; height: 100%; object-fit: cover; }
.contact-page__image div { position: absolute; z-index: 1; left: 1.5rem; bottom: 1.5rem; display: grid; color: white; }
.contact-page__image strong { font-family: var(--display); font-size: 2.4rem; }
@media (min-width: 768px) { .contact-page__grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .contact-page__image { height: 23rem; } }
</style>
