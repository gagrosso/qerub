// Bilingual copy for Qerub. Spanish is "neutral" (avoids vosotros/España-isms where possible).

// ── DATOS DE CONTACTO ───────────────────────────────────────────────────────
// Fuente única de los datos de contacto: edítalos aquí y se aplican en toda la web.
window.QERUB_CONTACT = {
  email:   'hola@qerub.com',            // TODO: confirmar correo real
  phone:   '+34 615 60 07 07',
  hoursEs: 'Lun–Vie · 9:00–18:00 CET',
  hoursEn: 'Mon–Fri · 9:00–18:00 CET',
};
// ────────────────────────────────────────────────────────────────────────────

window.QERUB_COPY = {
  es: {
    locale: 'es',
    nav: {
      services: 'Servicios',
      method: 'Método',
      sectors: 'Sectores',
      resources: 'Recursos',
      about: 'Sobre Qerub',
      contact: 'Contacto',
      cta: 'Solicitar diagnóstico',
    },
    hero: {
      eyebrow: 'Ciberseguridad práctica',
      title: 'Reducimos el riesgo digital de tu empresa.\nSin humo. Sin complejidad innecesaria.',
      sub: 'Auditamos, endurecemos y entrenamos tu operación digital — correo, identidades, Microsoft 365 y respuesta a incidentes — sin la complejidad ni el coste de una plataforma enterprise.',
      primary: 'Solicitar diagnóstico',
      secondary: 'Ver servicios',
      tag: 'Q-Start · Diagnóstico cerrado en 7 días hábiles',
    },
    trust: {
      title: 'Trabajamos con los marcos de referencia que importan',
      items: ['NIST CSF 2.0', 'CIS Controls IG1', 'ENISA SME', 'INCIBE', 'CISA', 'NIS2'],
    },
    pains: {
      eyebrow: 'Lo que ya está pasando',
      title: 'El 96% de las brechas vienen por tres caminos.\nProbablemente uno de ellos te toca hoy.',
      sub: 'Según el Verizon DBIR 2025, en empresas como la tuya — entre 10 y 250 empleados — la intrusión de sistemas, la ingeniería social y los ataques web básicos concentran la mayoría de incidentes. El ransomware aparece en el 88% de los casos.',
      items: [
        {
          k: '01',
          t: 'Fraude por correo (BEC)',
          d: 'Un proveedor cambia su cuenta bancaria por email. Nadie llama a verificar. El pago se va a otra cuenta. Sin SPF, DKIM, DMARC y doble aprobación, esto pasa.',
        },
        {
          k: '02',
          t: 'Microsoft 365 mal configurado',
          d: 'MFA desactivado para algún usuario, forwarding externo abierto, Conditional Access ausente. Una contraseña filtrada y el atacante entra como si fuera tuyo.',
        },
        {
          k: '03',
          t: 'Phishing creíble por IA',
          d: 'Los señuelos ya no tienen faltas. Si tu equipo no entrena con simulaciones cortas y continuas, alguien hará clic. La pregunta es cuándo.',
        },
        {
          k: '04',
          t: 'Ransomware sin plan',
          d: 'Las copias existen pero nadie las ha probado. No hay playbook, ni contactos, ni decisiones tomadas. Cuando llega el incidente, se pierden días — y dinero.',
        },
      ],
    },
    services: {
      eyebrow: 'Servicios',
      title: 'Cuatro frentes. Una propuesta cerrada para cada uno.',
      sub: 'Nada de consultoría infinita. Cada servicio tiene entregable definido, alcance claro y precio cerrado.',
      items: [
        {
          code: 'Q-Start',
          t: 'Diagnóstico',
          d: 'Revisión de correo, identidad, Microsoft 365 o Google Workspace, web pública, TLS, copias y plan de respuesta. Scorecard ejecutivo + top 15 riesgos + roadmap 90 días.',
          bullets: ['Scorecard ejecutivo', 'Top 15 riesgos priorizados', 'Quick wins 30 días', 'Roadmap 90 días'],
          time: '7 días hábiles',
        },
        {
          code: 'Q-365 Shield',
          t: 'Seguridad Microsoft 365 y correo',
          d: 'Hardening de identidad y correo: MFA, Conditional Access, revisión de forwarding, DKIM, etiquetado externo, accesos privilegiados y copias.',
          bullets: ['MFA y Conditional Access', 'SPF · DKIM · DMARC', 'Auditoría de accesos', 'Copias y retención'],
          time: '2–3 semanas',
        },
        {
          code: 'Q-Phishing Drill',
          t: 'Simulación de phishing y concienciación',
          d: 'Campañas cortas y continuas (no un PDF anual). Plantillas en español neutro. Reporting mensual. Apoyado en INCIBE y Gophish.',
          bullets: ['Campañas mensuales', 'Microlearning post-clic', 'Reporting ejecutivo', 'Kit INCIBE para empleados'],
          time: 'Continuo · cuota mensual',
        },
        {
          code: 'Q-Continuity',
          t: 'vCISO Lite y continuidad',
          d: 'Gobierno práctico mensual: riesgo vivo, seguimiento de acciones, mini comité, prueba de respuesta a incidentes y carpeta de evidencias para NIS2.',
          bullets: ['Revisión mensual', 'Comité ejecutivo', 'Drill de incidentes', 'Evidencias NIS2'],
          time: 'Continuo · cuota mensual',
        },
      ],
    },
    method: {
      eyebrow: 'Método',
      title: 'Cuatro pasos. Sin orquesta. Sin sobrediagnóstico.',
      sub: 'Diseñado para que un comité de dirección apruebe cada fase sin necesidad de un equipo técnico interno.',
      steps: [
        { k: '01', t: 'Escucha', d: 'Una llamada de 30 minutos. Entendemos tu operación, tus sistemas críticos y dónde duele.' },
        { k: '02', t: 'Diagnóstico', d: '7 días hábiles. Revisamos correo, identidad, Microsoft 365, web pública, copias y respuesta a incidentes.' },
        { k: '03', t: 'Remediación', d: '2 a 6 semanas según alcance. Aplicamos los quick wins y ejecutamos el roadmap. Te entregamos evidencias.' },
        { k: '04', t: 'Continuidad', d: 'Cuota mensual ligera. Revisión, drills, formación y evidencias para auditorías o NIS2.' },
      ],
    },
    deliverable: {
      eyebrow: 'Qué recibes',
      title: 'No te entregamos PowerPoints. Te entregamos decisiones.',
      sub: 'Cada cliente recibe la misma estructura: un scorecard ejecutivo de una página, una matriz de riesgos priorizados y un roadmap con tiempos y responsables.',
      label: 'Vista previa · informe Q-Start',
    },
    sectors: {
      eyebrow: 'Sectores',
      title: 'Hablamos el idioma de tu sector.',
      sub: 'Empezamos por los perfiles donde más rápido se entiende y se cierra. Si tu sector no aparece aquí, pregúntanos.',
      items: [
        { t: 'Asesorías y gestorías', d: 'Datos fiscales y bancarios de tus clientes. Cero margen para error.' },
        { t: 'Despachos profesionales', d: 'Confidencialidad, secreto profesional y comunicación cliente segura.' },
        { t: 'Clínicas y salud', d: 'Datos especialmente protegidos. Cumplimiento RGPD y continuidad.' },
        { t: 'Empresas de servicios', d: '10–250 empleados. Microsoft 365, proveedores, facturación y operación remota.' },
      ],
    },
    resources: {
      eyebrow: 'Recursos',
      title: 'Llévate algo útil antes de hablar con nosotros.',
      sub: 'Materiales gratuitos, sin paywall técnico. Basados en NIST, CIS, INCIBE y CISA — no en relleno.',
      items: [
        { t: 'Checklist de ciberhigiene', d: '32 controles esenciales para pymes basados en NIST CSF 2.0 y CIS IG1.', tag: 'PDF · 32 controles', href: '/resources/checklist-ciberhigiene-qerub.pdf' },
        { t: 'Guía de phishing y BEC', d: 'Cómo detectar y bloquear fraude por correo. Procedimiento de doble aprobación incluido.', tag: 'PDF · guía práctica', href: '/resources/guia-phishing-bec-qerub.pdf' },
        { t: 'Plantilla de respuesta a incidentes', d: 'Playbook editable con roles, decisiones y contactos. Lista para imprimir.', tag: 'DOCX editable', href: '/resources/plantilla-respuesta-incidentes-qerub.docx' },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'Lo que nos preguntan antes de empezar.',
      items: [
        {
          q: '¿Cuánto cuesta el diagnóstico Q-Start?',
          a: 'Precio cerrado en función del tamaño de tu organización. Te enviamos una propuesta concreta en 24 horas tras la primera llamada. Sin sorpresas.',
        },
        {
          q: '¿Necesitamos equipo técnico interno para trabajar con vosotros?',
          a: 'No. Q-Start está diseñado para que la dirección entienda y decida sin un CISO interno. Si tienes proveedor IT, coordinamos con él.',
        },
        {
          q: '¿Y si ya hicimos una auditoría hace tiempo?',
          a: 'Mejor. Partimos de ahí, no de cero. Validamos qué se ejecutó, qué quedó abierto y dónde están hoy los riesgos vivos.',
        },
        {
          q: '¿Trabajáis con NIS2?',
          a: 'Sí. Q-Continuity está pensado para generar evidencias trazables de gobierno, gestión de incidentes y continuidad — los pilares de NIS2.',
        },
        {
          q: '¿Hacéis pentesting?',
          a: 'No como puerta de entrada. Lo introducimos cuando la postura base ya está sana. Antes de eso, un pentest solo confirma lo que ya sabemos.',
        },
        {
          q: '¿Puedo contrataros solo para formación?',
          a: 'Sí. Q-Phishing Drill se contrata de forma independiente como cuota mensual.',
        },
      ],
    },
    finalCta: {
      title: 'Empieza por el diagnóstico.\nEn 7 días sabes exactamente dónde estás.',
      sub: 'Una llamada de 30 minutos. Cero compromiso. Salimos con un alcance claro y un precio cerrado.',
      primary: 'Solicitar diagnóstico',
      secondary: 'Hablar primero por correo',
    },
    contact: {
      eyebrow: 'Contacto',
      title: 'Cuéntanos qué está pasando.',
      sub: 'Respondemos en menos de 24 horas hábiles. La primera llamada es gratis y sin compromiso.',
      fields: {
        name: 'Nombre',
        company: 'Empresa',
        email: 'Correo corporativo',
        size: 'Tamaño de tu empresa',
        sizeOpts: ['1–9 empleados', '10–25 empleados', '26–50 empleados', '51–100 empleados', 'Más de 100'],
        msg: 'Cuéntanos brevemente qué te preocupa',
        msgPh: 'Ej: Recibimos intentos de fraude por correo y queremos revisar Microsoft 365…',
        consent: 'Acepto la política de privacidad',
        submit: 'Solicitar diagnóstico',
      },
      altTitle: 'O escríbenos directamente',
      altMail: window.QERUB_CONTACT.email,
      altPhone: window.QERUB_CONTACT.phone,
      altHours: window.QERUB_CONTACT.hoursEs,
    },
    about: {
      eyebrow: 'Sobre Qerub',
      title: 'Hacemos ciberseguridad útil.\nNo vendemos miedo.',
      body: [
        'Qerub nace de una observación simple: la mayoría de las pymes no necesita una plataforma de millones. Necesita orden, criterio y alguien que se haga cargo de las decisiones difíciles antes del incidente.',
        'Trabajamos con un manual público — NIST, CIS, ENISA, INCIBE, CISA — porque creemos que la seguridad de una pyme se construye con buenas decisiones repetidas, no con humo.',
        'Operamos sin oficina grande, sin contratos eternos y sin facturas opacas. Cada propuesta tiene alcance, precio y entregable. Si no podemos ayudarte, lo decimos antes de cobrar.',
      ],
      values: [
        { t: 'Claridad antes que tecnicismo', d: 'Si un comité de dirección no lo entiende, no sirve.' },
        { t: 'Prioridad antes que cobertura', d: 'Cubrimos lo que más reduce riesgo, no lo que mejor suena.' },
        { t: 'Evidencia antes que opinión', d: 'Cada recomendación se apoya en marco público y dato.' },
      ],
    },
    footer: {
      tag: 'WE SECURE · YOU LIVE SAFE',
      cols: {
        services: 'Servicios',
        company: 'Empresa',
        resources: 'Recursos',
      },
      links: {
        services: ['Q-Start · Diagnóstico', 'Q-365 Shield', 'Q-Phishing Drill', 'Q-Continuity'],
        company: ['Sobre Qerub', 'Sectores', 'Contacto'],
        resources: ['Checklist de ciberhigiene', 'Guía phishing/BEC', 'Plantilla de respuesta a incidentes'],
      },
      legal: '© 2026 Qerub · Aviso legal · Política de privacidad · Cookies',
      base: 'Ciberseguridad práctica. Sin complejidad enterprise.',
      privacy: 'Configuración de privacidad',
    },
    cookies: {
      title: 'Configuración de privacidad',
      body: 'Para que usted tenga la mejor experiencia posible, usamos cookies y otras tecnologías similares. Algunas cookies son necesarias para que el sitio web funcione, y no se pueden rechazar. Puede aceptar o rechazar las cookies adicionales, que se usan solamente para mejorar la experiencia del usuario. Estos datos nunca se pondrán a la venta ni se utilizarán con fines comerciales.',
      bodyMore: 'Si desea saber más, lea nuestra Política global sobre el uso de cookies y otras tecnologías. También puede personalizar en cualquier momento su configuración en la Configuración de privacidad.',
      policyLink: 'Política global sobre el uso de cookies',
      accept: 'Aceptar',
      reject: 'Rechazar',
      customize: 'Personalizar',
      save: 'Guardar selección',
      categories: [
        { k: 'necessary', t: 'Cookies necesarias', d: 'Imprescindibles para que el sitio web funcione (sesión, seguridad, idioma). No se pueden desactivar.', locked: true },
        { k: 'analytics', t: 'Cookies analíticas', d: 'Nos ayudan a entender cómo usas el sitio, de forma agregada y anónima, para mejorar el contenido.' },
        { k: 'marketing', t: 'Cookies de marketing', d: 'Permiten medir la efectividad de campañas y mostrar contenido relevante. Nunca se venden a terceros.' },
        { k: 'preferences', t: 'Cookies de preferencias', d: 'Recuerdan tus elecciones (idioma, región) para que no tengas que repetirlas en cada visita.' },
      ],
      reopen: 'Configuración de privacidad',
    },
  },

  en: {
    locale: 'en',
    nav: {
      services: 'Services',
      method: 'Method',
      sectors: 'Sectors',
      resources: 'Resources',
      about: 'About',
      contact: 'Contact',
      cta: 'Request assessment',
    },
    hero: {
      eyebrow: 'Practical cybersecurity',
      title: 'We reduce your company\u2019s digital risk.\nNo smoke. No unnecessary complexity.',
      sub: 'We audit, harden and train your digital operation — email, identities, Microsoft 365 and incident response — without the complexity or cost of an enterprise platform.',
      primary: 'Request assessment',
      secondary: 'See services',
      tag: 'Q-Start · Closed assessment in 7 business days',
    },
    trust: {
      title: 'We work with the frameworks that matter',
      items: ['NIST CSF 2.0', 'CIS Controls IG1', 'ENISA SME', 'INCIBE', 'CISA', 'NIS2'],
    },
    pains: {
      eyebrow: 'What\u2019s already happening',
      title: '96% of breaches come through three paths.\nOne of them is probably hitting you today.',
      sub: 'According to Verizon DBIR 2025, in companies like yours — between 10 and 250 employees — system intrusion, social engineering and basic web attacks concentrate most incidents. Ransomware shows up in 88% of cases.',
      items: [
        { k: '01', t: 'Email fraud (BEC)', d: 'A supplier changes their bank account via email. No one calls to verify. The payment lands somewhere else. Without SPF, DKIM, DMARC and dual approval, this happens.' },
        { k: '02', t: 'Misconfigured Microsoft 365', d: 'MFA off for one user, external forwarding open, no Conditional Access. One leaked password and the attacker walks in as if they were you.' },
        { k: '03', t: 'AI-grade phishing', d: 'Lures have no typos anymore. If your team doesn\u2019t train with short, continuous simulations, someone will click. The question is when.' },
        { k: '04', t: 'Ransomware without a plan', d: 'Backups exist but nobody has tested them. No playbook, no contacts, no decisions made. When the incident hits, you lose days — and money.' },
      ],
    },
    services: {
      eyebrow: 'Services',
      title: 'Four fronts. One closed offer for each.',
      sub: 'No infinite consulting. Each service has a defined deliverable, clear scope and a closed price.',
      items: [
        { code: 'Q-Start', t: 'Assessment', d: 'Review of email, identity, Microsoft 365 or Google Workspace, public web, TLS, backups and incident plan. Executive scorecard + top 15 risks + 90-day roadmap.', bullets: ['Executive scorecard', 'Top 15 prioritised risks', '30-day quick wins', '90-day roadmap'], time: '7 business days' },
        { code: 'Q-365 Shield', t: 'Microsoft 365 & email security', d: 'Identity and email hardening: MFA, Conditional Access, forwarding review, DKIM, external tagging, privileged access and backups.', bullets: ['MFA & Conditional Access', 'SPF · DKIM · DMARC', 'Access audit', 'Backups & retention'], time: '2\u20133 weeks' },
        { code: 'Q-Phishing Drill', t: 'Phishing simulation & awareness', d: 'Short, continuous campaigns (not a yearly PDF). Templates in neutral Spanish and English. Monthly reporting. Backed by INCIBE & Gophish.', bullets: ['Monthly campaigns', 'Post-click microlearning', 'Executive reporting', 'Employee kit'], time: 'Ongoing · monthly fee' },
        { code: 'Q-Continuity', t: 'vCISO Lite & continuity', d: 'Practical monthly governance: live risk register, action tracking, exec mini-committee, incident response drill and evidence folder for NIS2.', bullets: ['Monthly review', 'Exec committee', 'Incident drill', 'NIS2 evidence'], time: 'Ongoing · monthly fee' },
      ],
    },
    method: {
      eyebrow: 'Method',
      title: 'Four steps. No orchestra. No over-diagnosis.',
      sub: 'Designed so an exec committee can approve each phase without needing an internal technical team.',
      steps: [
        { k: '01', t: 'Listen', d: 'A 30-minute call. We understand your operation, critical systems and where it hurts.' },
        { k: '02', t: 'Assess', d: '7 business days. We review email, identity, Microsoft 365, public web, backups and incident response.' },
        { k: '03', t: 'Remediate', d: '2 to 6 weeks depending on scope. We apply the quick wins and execute the roadmap. We hand over evidence.' },
        { k: '04', t: 'Continue', d: 'Light monthly fee. Review, drills, training and evidence for audits or NIS2.' },
      ],
    },
    deliverable: {
      eyebrow: 'What you get',
      title: 'We don\u2019t hand over PowerPoints. We hand over decisions.',
      sub: 'Every client gets the same structure: a one-page executive scorecard, a prioritised risk matrix and a roadmap with timing and owners.',
      label: 'Preview · Q-Start report',
    },
    sectors: {
      eyebrow: 'Sectors',
      title: 'We speak your industry\u2019s language.',
      sub: 'We start with profiles where the conversation closes fastest. If your sector isn\u2019t here, ask us.',
      items: [
        { t: 'Accounting & advisory firms', d: 'Tax and banking data of your clients. Zero room for error.' },
        { t: 'Law firms', d: 'Confidentiality, attorney-client privilege and secure client comms.' },
        { t: 'Clinics & healthcare', d: 'Specially protected data. GDPR compliance and continuity.' },
        { t: 'Service companies', d: '10\u2013250 employees. Microsoft 365, suppliers, billing and remote ops.' },
      ],
    },
    resources: {
      eyebrow: 'Resources',
      title: 'Take something useful before we even talk.',
      sub: 'Free materials, no technical paywall. Based on NIST, CIS, INCIBE and CISA — not filler.',
      items: [
        { t: 'Cyber hygiene checklist', d: '32 essential controls for SMBs based on NIST CSF 2.0 and CIS IG1.', tag: 'PDF · 32 controls', href: '/resources/checklist-ciberhigiene-qerub.pdf' },
        { t: 'Phishing & BEC guide', d: 'How to detect and block email fraud. Dual-approval procedure included.', tag: 'PDF · practical guide', href: '/resources/guia-phishing-bec-qerub.pdf' },
        { t: 'Incident response template', d: 'Editable playbook with roles, decisions and contacts. Print-ready.', tag: 'Editable DOCX', href: '/resources/plantilla-respuesta-incidentes-qerub.docx' },
      ],
    },
    faq: {
      eyebrow: 'FAQ',
      title: 'What people ask us before starting.',
      items: [
        { q: 'How much is the Q-Start assessment?', a: 'Closed price based on your org size. We send a concrete proposal within 24 hours after the first call. No surprises.' },
        { q: 'Do we need an internal tech team to work with you?', a: 'No. Q-Start is designed for management to understand and decide without an internal CISO. If you have an IT vendor, we coordinate with them.' },
        { q: 'What if we already did an audit a while ago?', a: 'Even better. We start from there, not from zero. We validate what was executed, what remained open and where the live risks are today.' },
        { q: 'Do you work with NIS2?', a: 'Yes. Q-Continuity is built to produce traceable governance evidence, incident management and continuity — the pillars of NIS2.' },
        { q: 'Do you do pentesting?', a: 'Not as an entry point. We introduce it once the base posture is healthy. Before that, a pentest only confirms what we already know.' },
        { q: 'Can I hire you only for training?', a: 'Yes. Q-Phishing Drill is contracted independently as a monthly fee.' },
      ],
    },
    finalCta: {
      title: 'Start with the assessment.\nIn 7 days you know exactly where you stand.',
      sub: 'A 30-minute call. Zero commitment. You walk out with clear scope and a closed price.',
      primary: 'Request assessment',
      secondary: 'Email us first',
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Tell us what\u2019s going on.',
      sub: 'We reply in under 24 business hours. The first call is free and with no commitment.',
      fields: {
        name: 'Name',
        company: 'Company',
        email: 'Work email',
        size: 'Company size',
        sizeOpts: ['1\u20139 employees', '10\u201325 employees', '26\u201350 employees', '51\u2013100 employees', 'More than 100'],
        msg: 'Briefly, what worries you',
        msgPh: 'e.g. We\u2019re seeing email fraud attempts and want to review Microsoft 365\u2026',
        consent: 'I accept the privacy policy',
        submit: 'Request assessment',
      },
      altTitle: 'Or write us directly',
      altMail: window.QERUB_CONTACT.email,
      altPhone: window.QERUB_CONTACT.phone,
      altHours: window.QERUB_CONTACT.hoursEn,
    },
    about: {
      eyebrow: 'About Qerub',
      title: 'We do useful cybersecurity.\nWe don\u2019t sell fear.',
      body: [
        'Qerub starts from a simple observation: most SMBs don\u2019t need a million-dollar platform. They need order, judgment and someone who takes responsibility for the hard decisions before the incident.',
        'We work with a public playbook — NIST, CIS, ENISA, INCIBE, CISA — because we believe SMB security is built with good decisions repeated, not with smoke.',
        'We operate without a big office, without forever contracts and without opaque invoices. Every proposal has scope, price and deliverable. If we can\u2019t help you, we say so before billing.',
      ],
      values: [
        { t: 'Clarity over jargon', d: 'If the exec committee doesn\u2019t get it, it doesn\u2019t work.' },
        { t: 'Priority over coverage', d: 'We cover what reduces most risk, not what sounds best.' },
        { t: 'Evidence over opinion', d: 'Every recommendation is anchored in public framework and data.' },
      ],
    },
    footer: {
      tag: 'WE SECURE · YOU LIVE SAFE',
      cols: {
        services: 'Services',
        company: 'Company',
        resources: 'Resources',
      },
      links: {
        services: ['Q-Start · Assessment', 'Q-365 Shield', 'Q-Phishing Drill', 'Q-Continuity'],
        company: ['About Qerub', 'Sectors', 'Contact'],
        resources: ['Cyber hygiene checklist', 'Phishing/BEC guide', 'Incident response template'],
      },
      legal: '© 2026 Qerub · Legal notice · Privacy policy · Cookies',
      base: 'Practical cybersecurity. Without enterprise complexity.',
      privacy: 'Privacy settings',
    },
    cookies: {
      title: 'Privacy settings',
      body: 'To give you the best possible experience we use cookies and similar technologies. Some cookies are required for the site to work and cannot be rejected. You can accept or reject additional cookies, which are only used to improve your experience. This data is never sold or used for commercial purposes.',
      bodyMore: 'For more details, read our Global cookie policy. You can also personalise your choices at any time in Privacy settings.',
      policyLink: 'Global cookie policy',
      accept: 'Accept',
      reject: 'Reject',
      customize: 'Customise',
      save: 'Save selection',
      categories: [
        { k: 'necessary', t: 'Necessary cookies', d: 'Required for the site to function (session, security, language). Cannot be disabled.', locked: true },
        { k: 'analytics', t: 'Analytics cookies', d: 'Help us understand how you use the site, aggregated and anonymous, so we can improve content.' },
        { k: 'marketing', t: 'Marketing cookies', d: 'Measure campaign effectiveness and show relevant content. Never sold to third parties.' },
        { k: 'preferences', t: 'Preference cookies', d: 'Remember your choices (language, region) so you don\u2019t repeat them every visit.' },
      ],
      reopen: 'Privacy settings',
    },
  },
};
