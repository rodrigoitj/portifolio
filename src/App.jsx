import { content } from "./data.js";

export default function App({ theme, setTheme, lang, setLang }) {
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  const toggleLang = () => setLang(lang === "en" ? "pt-br" : "en");

  const { doc, resume, ui } = content[lang];
  const themeLabel = theme === "dark" ? ui.themeToggle.toLight : ui.themeToggle.toDark;

  return (
    <>
      <div className="toggle-group">
        <button
          className="lang-toggle"
          onClick={toggleLang}
          aria-label={ui.langToggle}
          title={ui.langToggle}
        >
          {lang === "en" ? "PT" : "EN"}
        </button>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={themeLabel}
          title={themeLabel}
        >
          {theme === "dark" ? <IconSun /> : <IconMoon />}
        </button>
      </div>

      <div className="strip">
        <span className="top">{doc.classification}</span>
        <span className="doc-id">{doc.id}</span>
        <span className="bot">{doc.status}</span>
      </div>

      <div className="doc">
        <div className="topbar">
          <span>{doc.id} · {ui.documentType}</span>
          <div className="right">
            <span>{ui.rev} {doc.rev}</span>
            <span>{ui.sheet} {doc.sheet}</span>
            <span className="stamp">{doc.classification}</span>
          </div>
        </div>

        <TitleBlock resume={resume} ui={ui} />

        <header className="hero">
          <div className="left">
            <div className="role-line">{ui.roleLine}</div>
            <h1>
              Rodrigo <em>Corrêa</em>
            </h1>
          </div>
          <div className="right">
            <div className="meta-line">{ui.abstract}</div>
            <p className="summary">{resume.summary}</p>
          </div>
        </header>

        <Section {...ui.sections.stack}>
          <div className="stack-grid">
            {Object.entries(resume.stack).map(([group, items]) => (
              <div className="stack-group" key={group}>
                <h3>{group}</h3>
                <div className="items">
                  {items.map((s) => (
                    <span className="tag" key={s}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section {...ui.sections.experience}>
          <div className="exp-list">
            {resume.experience.map((job, i) => (
              <article className="exp" key={i}>
                <div className="gutter">
                  <span className="period">{job.period}</span>
                  <span className="tenure">{job.tenure}</span>
                  <span className="mode">{job.mode}</span>
                </div>
                <div className="body">
                  <div className="head">
                    <div className="title">
                      {job.role}
                      {job.client && (
                        <>
                          {" "}
                          <span className="client-tag">{ui.via} {job.company}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="org">
                    <strong>{job.client || job.company}</strong>
                    {job.client && ` · ${job.company}`} · {job.location}
                  </div>
                  <ul>
                    {job.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                  <div className="env">
                    {job.env.map((e) => (
                      <span className="env-tag" key={e}>
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section {...ui.sections.education}>
          <div className="kv-rows">
            {resume.education.map((e, i) => (
              <div className="kv-row" key={i}>
                <div className="k">{e.period}</div>
                <div className="v">
                  {e.degree}
                  <small>
                    {e.school} · {e.location}
                  </small>
                </div>
                <div className="status ok">{e.status}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section {...ui.sections.languages}>
          <div className="kv-rows">
            {resume.languages.map((l, i) => (
              <div className="kv-row" key={i}>
                <div className="k">
                  {l.code} · {l.level}
                </div>
                <div className="v">{l.name}</div>
                <div className="status">
                  {ui.cefr}
                  <span className="cefr">{l.cefr}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section {...ui.sections.contact}>
          <div className="contact-block">
            <div className="contact-cell">
              <div className="k">{ui.contact.email}</div>
              <div className="v">
                <a href={`mailto:${resume.email}`}>{resume.email}</a>
              </div>
            </div>
            <div className="contact-cell">
              <div className="k">{ui.contact.phone}</div>
              <div className="v">{resume.phone}</div>
            </div>
            <div className="contact-cell">
              <div className="k">{ui.contact.network}</div>
              <div className="v">
                <a href={resume.linkedin} target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/rodrigoitj
                </a>
              </div>
            </div>
            <div className="contact-cell">
              <div className="k">{ui.contact.region}</div>
              <div className="v">
                {resume.location}
                <small
                  style={{
                    display: "block",
                    fontFamily: "var(--mono)",
                    fontSize: 11,
                    color: "var(--ink-3)",
                    marginTop: 4,
                  }}
                >
                  {resume.region}
                </small>
              </div>
            </div>
          </div>
        </Section>

        <div className="end-block">
          <div className="cell">
            <div className="label">{ui.endBlock.drawnBy}</div>
            <div className="value">{doc.drawnBy}</div>
          </div>
          <div className="cell">
            <div className="label">{ui.endBlock.revision}</div>
            <div className="value">{doc.revisionDate}</div>
          </div>
          <div className="cell">
            <div className="label">{ui.endBlock.documentId}</div>
            <div className="value">{doc.id}</div>
          </div>
          <div className="cell" style={{ textAlign: "right" }}>
            <div className="label">{ui.endBlock.status}</div>
            <span className="stamp">{resume.availability}</span>
          </div>
        </div>
      </div>
    </>
  );
}

function TitleBlock({ resume, ui }) {
  return (
    <div className="title-block">
      <div className="cell">
        <div className="label">{ui.titleBlock.subject}</div>
        <div className="value big">{resume.name}</div>
      </div>
      <div className="cell">
        <div className="label">{ui.titleBlock.discipline}</div>
        <div className="value">{resume.role}</div>
      </div>
      <div className="cell">
        <div className="label">{ui.titleBlock.yearsActive}</div>
        <div className="value">{resume.yearsActive}</div>
      </div>
      <div className="cell">
        <div className="label">{ui.titleBlock.domain}</div>
        <div className="value">{resume.domain}</div>
      </div>
    </div>
  );
}

function Section({ num, crumb, title, children }) {
  return (
    <section>
      <header className="sec-head">
        <span className="num">{num}</span>
        <h2>{title}</h2>
        <span className="crumb">{crumb}</span>
      </header>
      {children}
    </section>
  );
}

function IconSun() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function IconMoon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}