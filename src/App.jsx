import { doc, resume } from "./data.js";

export default function App({ theme, setTheme }) {
  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <>
      <button
        className="theme-toggle"
        onClick={toggle}
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      >
        {theme === "dark" ? <IconSun /> : <IconMoon />}
      </button>

      <div className="strip">
        <span className="top">{doc.classification}</span>
        <span className="doc-id">{doc.id}</span>
        <span className="bot">{doc.status}</span>
      </div>

      <div className="doc">
        <div className="topbar">
          <span>{doc.id} · TECHNICAL RECORD</span>
          <div className="right">
            <span>REV {doc.rev}</span>
            <span>SHEET {doc.sheet}</span>
            <span className="stamp">{doc.classification}</span>
          </div>
        </div>

        <TitleBlock />

        <header className="hero">
          <div className="left">
            <div className="role-line">Full Stack Developer · .NET · Azure</div>
            <h1>
              Rodrigo <em>Corrêa</em>
            </h1>
          </div>
          <div className="right">
            <div className="meta-line">§0 · Abstract</div>
            <p className="summary">{resume.summary}</p>
          </div>
        </header>

        <Section num="§01" crumb="Stack & Practice" title="Technical Stack">
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

        <Section
          num="§02"
          crumb="Operational Record"
          title="Professional Experience"
        >
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
                        <span className="client-tag">via {job.company}</span>
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

        <Section num="§03" crumb="Academic Record" title="Education">
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

        <Section num="§04" crumb="Working Languages" title="Languages">
          <div className="kv-rows">
            {resume.languages.map((l, i) => (
              <div className="kv-row" key={i}>
                <div className="k">
                  {l.code} · {l.level}
                </div>
                <div className="v">{l.name}</div>
                <div className="status">
                  CEFR
                  <span className="cefr">{l.cefr}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section num="§05" crumb="Point of Contact" title="Contact">
          <div className="contact-block">
            <div className="contact-cell">
              <div className="k">Electronic Mail</div>
              <div className="v">
                <a href={`mailto:${resume.email}`}>{resume.email}</a>
              </div>
            </div>
            <div className="contact-cell">
              <div className="k">Telephony</div>
              <div className="v">{resume.phone}</div>
            </div>
            <div className="contact-cell">
              <div className="k">Professional Network</div>
              <div className="v">
                <a href={resume.linkedin} target="_blank" rel="noopener noreferrer">
                  linkedin.com/in/rodrigoitj
                </a>
              </div>
            </div>
            <div className="contact-cell">
              <div className="k">Region / Time Zone</div>
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
            <div className="label">Drawn By</div>
            <div className="value">{doc.drawnBy}</div>
          </div>
          <div className="cell">
            <div className="label">Revision</div>
            <div className="value">{doc.revisionDate}</div>
          </div>
          <div className="cell">
            <div className="label">Document ID</div>
            <div className="value">{doc.id}</div>
          </div>
          <div className="cell" style={{ textAlign: "right" }}>
            <div className="label">Status</div>
            <span className="stamp">{resume.availability}</span>
          </div>
        </div>
      </div>
    </>
  );
}

function TitleBlock() {
  return (
    <div className="title-block">
      <div className="cell">
        <div className="label">Subject</div>
        <div className="value big">{resume.name}</div>
      </div>
      <div className="cell">
        <div className="label">Discipline</div>
        <div className="value">{resume.role}</div>
      </div>
      <div className="cell">
        <div className="label">Years Active</div>
        <div className="value">{resume.yearsActive}</div>
      </div>
      <div className="cell">
        <div className="label">Domain</div>
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