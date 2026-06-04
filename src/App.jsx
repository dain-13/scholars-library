import { useMemo, useState } from "react";
import "./App.css";

const TEXT = {
  ko: {
    appTitle: "학자의 서재",
    appSubtitle: "책을 펼치면, 하나의 학문이 연구실이 됩니다.",
    language: "EN",
    home: "서재로 돌아가기",
    back: "이전으로",
    enterBook: "책 펼치기",
    closeBook: "책 닫기",
    reset: "초기화",
    bookshelfTitle: "고요한 책장 앞에서",
    bookshelfSubtitle: "오늘은 어떤 학문의 책을 펼쳐볼까요?",
    criminology: "범죄학",
    statistics: "통계학",
    methods: "연구방법론",
    psychology: "심리학",
    toc: "목차",
    deskTitle: "범죄학자의 책상",
    deskSubtitle: "당신의 임무는 범죄를 수사하는 것이 아니라, 범죄를 설명하는 것입니다.",
    interviewTitle: "면담기록",
    collect: "근거 수집",
    collected: "수집완료",
    chooseEvidence: "이 히스토리는 어떤 근거로 볼 수 있을까요?",
    correct: "근거 수집 완료",
    incorrect: "다시 생각해보세요. 히스토리의 핵심 단서를 더 살펴보세요.",
    corkBoard: "수집한 근거",
    selectTheory: "수집한 근거를 바탕으로 적합한 이론을 모두 선택하세요",
    analyze: "분석 결과 보기",
    resultTitle: "분석 결과",
    recommended: "가장 설명력이 높은 이론",
    additional: "함께 설명 가능한 이론",
    sourceTitle: "관련 학자와 고전문헌",
    statsTitle: "통계 도서관",
    methodsTitle: "연구자의 연구실",
    psychologyTitle: "심리학 실험실",
    comingSoon: "준비 중",
  },
  en: {
    appTitle: "The Scholar's Library",
    appSubtitle: "Open a book, and each discipline becomes a research room.",
    language: "KO",
    home: "Back to Library",
    back: "Back",
    enterBook: "Open Book",
    closeBook: "Close Book",
    reset: "Reset",
    bookshelfTitle: "Before the Silent Bookshelf",
    bookshelfSubtitle: "Which discipline will you open today?",
    criminology: "Criminology",
    statistics: "Statistics",
    methods: "Research Methods",
    psychology: "Psychology",
    toc: "Table of Contents",
    deskTitle: "The Criminologist's Desk",
    deskSubtitle: "Your task is not to investigate the crime, but to explain it.",
    interviewTitle: "Interview Record",
    collect: "Collect Evidence",
    collected: "Collected",
    chooseEvidence: "What kind of evidence does this history suggest?",
    correct: "Evidence collected",
    incorrect: "Think again. Focus on the core clue in the history.",
    corkBoard: "Collected Evidence",
    selectTheory: "Select all theories that fit the evidence you collected",
    analyze: "View Analysis",
    resultTitle: "Analysis Result",
    recommended: "Most Explanatory Theory",
    additional: "Additional Applicable Theories",
    sourceTitle: "Scholars and Classic Sources",
    statsTitle: "Statistics Library",
    methodsTitle: "Research Lab",
    psychologyTitle: "Psychology Lab",
    comingSoon: "Coming Soon",
  },
};

const BOOKS = [
  {
    id: "criminology",
    koTitle: "범죄학",
    enTitle: "Criminology",
    koDesc: "사례를 읽고 근거를 수집하여 이론으로 설명합니다.",
    enDesc: "Explain a case by collecting evidence and applying theory.",
    className: "book-crimson",
  },
  {
    id: "statistics",
    koTitle: "통계학",
    enTitle: "Statistics",
    koDesc: "통계방법론을 언제, 왜 쓰는지 이해합니다.",
    enDesc: "Understand when and why statistical methods are used.",
    className: "book-sapphire",
  },
  {
    id: "methods",
    koTitle: "연구방법론",
    enTitle: "Research Methods",
    koDesc: "연구질문과 분석방법을 연결합니다.",
    enDesc: "Connect research questions with analytic choices.",
    className: "book-emerald",
  },
  {
    id: "psychology",
    koTitle: "심리학",
    enTitle: "Psychology",
    koDesc: "심리학 이론과 실험 콘텐츠를 준비 중입니다.",
    enDesc: "A future room for psychology theories and experiments.",
    className: "book-violet",
  },
];

const TOC = {
  ko: {
    criminology: [
      { id: "case001", title: "Case 001. 청소년 절도 사례", desc: "면담기록 속 단서를 읽고 범죄학 이론으로 설명하기" },
      { id: "theory", title: "범죄학 이론 노트", desc: "사회유대, 사회학습, 긴장, 낙인이론의 핵심 비교" },
    ],
    statistics: [
      { id: "basic", title: "기초 통계방법론", desc: "t검정, 상관분석, 회귀분석, 카이제곱 검정 이해하기" },
      { id: "advanced", title: "고급 분석 노트", desc: "로지스틱 회귀, LPA, 생존분석의 사용 맥락" },
    ],
    methods: [
      { id: "quiz", title: "분석방법 선택 훈련", desc: "연구질문과 변수 형태를 보고 분석방법 고르기" },
      { id: "design", title: "연구설계 노트", desc: "가설, 변수, 표본, 분석전략 연결하기" },
    ],
    psychology: [
      { id: "coming", title: "심리학 교재 기반 확장 예정", desc: "심리학 이론 카드와 실험형 학습 페이지 준비 중" },
    ],
  },
  en: {
    criminology: [
      { id: "case001", title: "Case 001. Juvenile Theft Case", desc: "Read interview clues and explain the case through criminological theory" },
      { id: "theory", title: "Criminology Theory Notes", desc: "Compare social bond, social learning, strain, and labeling theories" },
    ],
    statistics: [
      { id: "basic", title: "Basic Statistical Methods", desc: "Understand t-test, correlation, regression, and chi-square tests" },
      { id: "advanced", title: "Advanced Analysis Notes", desc: "When to use logistic regression, LPA, and survival analysis" },
    ],
    methods: [
      { id: "quiz", title: "Choosing an Analysis Method", desc: "Choose methods based on research questions and variable types" },
      { id: "design", title: "Research Design Notes", desc: "Connect hypotheses, variables, samples, and analysis strategies" },
    ],
    psychology: [
      { id: "coming", title: "Psychology Textbook Expansion", desc: "Future theory cards and experiment-based pages" },
    ],
  },
};

const CASE = {
  ko: {
    id: "CASE 001",
    title: "청소년 절도 사례",
    profile: {
      name: "김○○",
      age: "17세",
      offense: "절도",
      summary:
        "중학교 2학년 이후 결석이 늘었고, 최근 비행친구들과 함께 편의점 절도에 가담하였다.",
    },
    interview: [
      { text: "대상자는 초등학교 고학년 무렵부터 ", key: null },
      { text: "가족", key: "family" },
      { text: " 안에서 잦은 갈등을 경험했다고 진술하였다. 보호자는 생계 문제로 귀가가 늦었고, 대상자의 귀가 시간이나 친구 관계를 지속적으로 확인하기 어려웠다. 중학교에 진학한 이후에는 ", key: null },
      { text: "학교", key: "school" },
      { text: "생활에 흥미를 잃기 시작했고, 중학교 2학년 이후 지각과 결석이 증가하였다. 이후 대상자는 동네에서 만난 ", key: null },
      { text: "친구", key: "peer" },
      { text: "들과 자주 어울리게 되었으며, 그중 일부는 이미 절도와 무단결석 경험이 있었다. 대상자는 이들과 시간을 보내며 처음으로 절도 방법을 알게 되었다고 말했다. 면담 중 대상자는 자신이 어디에서도 인정받지 못한다고 느꼈으며, 최근에는 사소한 일에도 쉽게 분노가 올라온다고 표현했다. 특히 학교에서 자신을 이미 ", key: null },
      { text: "문제학생", key: "labeling" },
      { text: "으로 보는 분위기가 있었다고 말하면서, ‘어차피 나를 믿어주는 사람은 없다’고 진술하였다.", key: null },
    ],
    clues: {
      family: {
        title: "가족 히스토리",
        detail:
          "부모는 대상자가 초등학교 고학년일 때부터 잦은 갈등을 보였다. 보호자는 생계 문제로 늦게 귀가하는 일이 많았고, 대상자의 귀가 시간이나 친구 관계를 지속적으로 확인하기 어려웠다.",
        options: [
          { id: "weak_supervision", label: "부모감독 약화", theory: "socialBond", correct: true },
          { id: "high_self_control", label: "높은 자기통제력", theory: "selfControl", correct: false },
          { id: "peer_reinforcement", label: "또래 강화", theory: "socialLearning", correct: false },
        ],
      },
      school: {
        title: "학교생활 히스토리",
        detail:
          "중학교 2학년 이후 지각과 결석이 증가했다. 담임교사는 대상자가 수업에 흥미를 잃고, 학교생활에서 소속감을 느끼지 못하는 것 같다고 기록했다.",
        options: [
          { id: "school_commitment", label: "학교 몰입 저하", theory: "socialBond", correct: true },
          { id: "formal_label", label: "공식적 낙인", theory: "labeling", correct: false },
          { id: "criminal_skill", label: "범죄기술 학습", theory: "socialLearning", correct: false },
        ],
      },
      peer: {
        title: "친구관계 히스토리",
        detail:
          "최근 어울리는 친구들 중 일부는 절도와 무단결석 경험이 있었다. 대상자는 친구들과 함께 시간을 보내며 처음으로 절도 방법을 알게 되었다고 진술했다.",
        options: [
          { id: "delinquent_peer", label: "비행친구와의 접촉", theory: "socialLearning", correct: true },
          { id: "school_attachment", label: "학교 애착 강화", theory: "socialBond", correct: false },
          { id: "negative_emotion", label: "부정적 감정", theory: "generalStrain", correct: false },
        ],
      },
      labeling: {
        title: "학교 평가 히스토리",
        detail:
          "학교에서는 대상자를 ‘문제학생’으로 인식하는 분위기가 형성되어 있었다. 대상자는 교사와 또래가 자신을 이미 나쁜 학생으로 본다고 느꼈다.",
        options: [
          { id: "labeling_experience", label: "낙인 경험", theory: "labeling", correct: true },
          { id: "parental_monitoring", label: "부모감독 강화", theory: "socialBond", correct: false },
          { id: "low_opportunity", label: "범죄 기회 부족", theory: "rationalChoice", correct: false },
        ],
      },
    },
    theories: {
      socialLearning: {
        name: "사회학습이론",
        scholar: "Ronald Akers",
        explanation:
          "비행친구와의 접촉, 범죄기술 학습, 또래 강화가 나타날 때 강하게 적용됩니다.",
        source: "Akers, R. L. (1998). Social Learning and Social Structure.",
      },
      socialBond: {
        name: "사회유대이론",
        scholar: "Travis Hirschi",
        explanation:
          "부모 애착, 학교 몰입, 규범 신념 등 사회적 유대가 약화될 때 적용됩니다.",
        source: "Hirschi, T. (1969). Causes of Delinquency.",
      },
      generalStrain: {
        name: "일반긴장이론",
        scholar: "Robert Agnew",
        explanation:
          "좌절, 분노, 억울함 등 부정적 감정과 긴장이 비행으로 이어질 수 있다고 봅니다.",
        source: "Agnew, R. (1992). Foundation for a general strain theory of crime and delinquency.",
      },
      labeling: {
        name: "낙인이론",
        scholar: "Howard Becker",
        explanation:
          "문제아, 범죄자 등으로 규정되는 경험이 자기인식과 행동에 영향을 줄 수 있다고 봅니다.",
        source: "Becker, H. S. (1963). Outsiders.",
      },
      selfControl: {
        name: "자기통제이론",
        scholar: "Gottfredson & Hirschi",
        explanation:
          "충동성, 즉각적 만족 추구, 장기적 결과 고려 부족을 중심으로 범죄를 설명합니다.",
        source: "Gottfredson, M. R., & Hirschi, T. (1990). A General Theory of Crime.",
      },
    },
  },
  en: {
    id: "CASE 001",
    title: "Juvenile Theft Case",
    profile: {
      name: "Kim ○○",
      age: "17",
      offense: "Theft",
      summary:
        "Since the second year of middle school, absenteeism increased. Recently, the youth participated in convenience store theft with delinquent peers.",
    },
    interview: [
      { text: "The youth reported frequent conflict within the ", key: null },
      { text: "family", key: "family" },
      { text: " since late elementary school. The guardian often returned home late due to financial pressure, making it difficult to monitor curfew and peer relationships. After entering middle school, the youth began to lose interest in ", key: null },
      { text: "school", key: "school" },
      { text: " life. Later, the youth spent more time with neighborhood ", key: null },
      { text: "peers", key: "peer" },
      { text: ", some of whom had already experienced theft and truancy. The youth stated that they first learned how to steal while spending time with them. The youth also felt repeatedly treated as a ", key: null },
      { text: "problem student", key: "labeling" },
      { text: " and said, 'No one believes in me anyway.'", key: null },
    ],
    clues: {
      family: {
        title: "Family History",
        detail:
          "Parental conflict increased during late elementary school. The guardian often returned home late due to economic pressure, making it difficult to monitor curfew and peer relationships.",
        options: [
          { id: "weak_supervision", label: "Weak parental supervision", theory: "socialBond", correct: true },
          { id: "high_self_control", label: "High self-control", theory: "selfControl", correct: false },
          { id: "peer_reinforcement", label: "Peer reinforcement", theory: "socialLearning", correct: false },
        ],
      },
      school: {
        title: "School History",
        detail:
          "Tardiness and absenteeism increased. The teacher noted that the youth had lost interest in class and felt little belonging at school.",
        options: [
          { id: "school_commitment", label: "Weak school commitment", theory: "socialBond", correct: true },
          { id: "formal_label", label: "Formal labeling", theory: "labeling", correct: false },
          { id: "criminal_skill", label: "Learning criminal skills", theory: "socialLearning", correct: false },
        ],
      },
      peer: {
        title: "Peer History",
        detail:
          "Some of the youth's recent friends had histories of theft and truancy. The youth first learned how to steal while spending time with those peers.",
        options: [
          { id: "delinquent_peer", label: "Contact with delinquent peers", theory: "socialLearning", correct: true },
          { id: "school_attachment", label: "Strong school attachment", theory: "socialBond", correct: false },
          { id: "negative_emotion", label: "Negative emotion", theory: "generalStrain", correct: false },
        ],
      },
      labeling: {
        title: "Teacher Evaluation History",
        detail:
          "At school, the youth was widely perceived as a problem student. The youth felt that teachers and peers already viewed them as bad.",
        options: [
          { id: "labeling_experience", label: "Labeling experience", theory: "labeling", correct: true },
          { id: "parental_monitoring", label: "Strong parental monitoring", theory: "socialBond", correct: false },
          { id: "low_opportunity", label: "Lack of criminal opportunity", theory: "rationalChoice", correct: false },
        ],
      },
    },
    theories: {
      socialLearning: {
        name: "Social Learning Theory",
        scholar: "Ronald Akers",
        explanation:
          "This theory fits when delinquent peers, learned techniques, and reinforcement are present.",
        source: "Akers, R. L. (1998). Social Learning and Social Structure.",
      },
      socialBond: {
        name: "Social Bond Theory",
        scholar: "Travis Hirschi",
        explanation:
          "This theory fits when attachment, commitment, involvement, or belief are weakened.",
        source: "Hirschi, T. (1969). Causes of Delinquency.",
      },
      generalStrain: {
        name: "General Strain Theory",
        scholar: "Robert Agnew",
        explanation:
          "This theory focuses on strain, anger, frustration, and negative emotions.",
        source: "Agnew, R. (1992). Foundation for a general strain theory of crime and delinquency.",
      },
      labeling: {
        name: "Labeling Theory",
        scholar: "Howard Becker",
        explanation:
          "This theory focuses on how being labeled deviant can shape identity and behavior.",
        source: "Becker, H. S. (1963). Outsiders.",
      },
      selfControl: {
        name: "Self-Control Theory",
        scholar: "Gottfredson & Hirschi",
        explanation:
          "This theory explains crime through impulsivity and preference for immediate gratification.",
        source: "Gottfredson, M. R., & Hirschi, T. (1990). A General Theory of Crime.",
      },
    },
  },
};

const STATS_CARDS = {
  ko: [
    { title: "t검정", question: "두 집단의 평균이 다른가?", example: "남학생과 여학생의 자기통제력 평균 차이" },
    { title: "상관분석", question: "두 연속형 변수가 함께 변하는가?", example: "비행친구 수와 비행빈도의 관계" },
    { title: "회귀분석", question: "한 변수가 다른 변수를 예측하는가?", example: "부모감독이 비행빈도를 예측하는지 검증" },
    { title: "로지스틱 회귀", question: "결과변수가 0/1일 때 무엇이 영향을 미치는가?", example: "후기비행 진입 여부 예측" },
  ],
  en: [
    { title: "t-test", question: "Do two groups differ in means?", example: "Mean difference in self-control by gender" },
    { title: "Correlation", question: "Do two continuous variables move together?", example: "Delinquent peers and delinquency frequency" },
    { title: "Regression", question: "Does one variable predict another?", example: "Parental supervision predicting delinquency" },
    { title: "Logistic Regression", question: "What predicts a binary outcome?", example: "Predicting late-onset delinquency" },
  ],
};

const METHOD_QUIZ = {
  ko: {
    question: "비행친구 수가 후기비행 진입 여부에 영향을 미치는가?",
    variables: ["독립변수: 비행친구 수", "종속변수: 후기비행 진입 여부(0 = 없음, 1 = 있음)"],
    options: ["상관분석", "t검정", "로지스틱 회귀", "일원분산분석"],
    answer: "로지스틱 회귀",
    explanation:
      "종속변수가 0/1로 코딩된 이분형 변수이므로 로지스틱 회귀가 적합합니다.",
  },
  en: {
    question: "Does the number of delinquent peers affect entry into late-onset delinquency?",
    variables: ["IV: Number of delinquent peers", "DV: Late-onset delinquency entry (0 = No, 1 = Yes)"],
    options: ["Correlation", "t-test", "Logistic Regression", "One-way ANOVA"],
    answer: "Logistic Regression",
    explanation:
      "Because the dependent variable is binary, logistic regression is appropriate.",
  },
};

function App() {
  const [lang, setLang] = useState("ko");
  const [selectedBook, setSelectedBook] = useState(null);
  const [bookStep, setBookStep] = useState("library"); // library, cover, toc, chapter
  const [selectedChapter, setSelectedChapter] = useState(null);

  const [selectedClue, setSelectedClue] = useState(null);
  const [collected, setCollected] = useState({});
  const [wrongChoice, setWrongChoice] = useState(null);
  const [selectedTheories, setSelectedTheories] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [methodChoice, setMethodChoice] = useState(null);

  const t = TEXT[lang];
  const currentBook = BOOKS.find((book) => book.id === selectedBook);
  const currentCase = CASE[lang];

  const collectedItems = Object.entries(collected).map(([clueKey, option]) => ({
    clueKey,
    ...option,
  }));

  const theoryScores = useMemo(() => {
    const scores = {};
    collectedItems.forEach((item) => {
      scores[item.theory] = (scores[item.theory] || 0) + 1;
    });
    return scores;
  }, [collectedItems]);

  const rankedTheories = useMemo(() => {
    return Object.entries(currentCase.theories)
      .map(([key, theory]) => ({
        key,
        ...theory,
        score: theoryScores[key] || 0,
      }))
      .sort((a, b) => b.score - a.score);
  }, [currentCase.theories, theoryScores]);

  const goLibrary = () => {
    setSelectedBook(null);
    setBookStep("library");
    setSelectedChapter(null);
    setSelectedClue(null);
    setShowResult(false);
  };

  const goBack = () => {
    if (bookStep === "chapter") {
      setBookStep("toc");
      setSelectedChapter(null);
      setSelectedClue(null);
      setShowResult(false);
      return;
    }

    if (bookStep === "toc") {
      setBookStep("cover");
      return;
    }

    if (bookStep === "cover") {
      goLibrary();
    }
  };

  const chooseBook = (bookId) => {
    setSelectedBook(bookId);
    setBookStep("cover");
    setSelectedChapter(null);
  };

  const resetCurrentWork = () => {
    setCollected({});
    setWrongChoice(null);
    setSelectedTheories([]);
    setShowResult(false);
    setMethodChoice(null);
  };

  const selectEvidenceOption = (clueKey, option) => {
    if (!option.correct) {
      setWrongChoice(option.id);
      return;
    }

    setCollected((prev) => ({
      ...prev,
      [clueKey]: option,
    }));
    setWrongChoice(null);
  };

  const toggleTheory = (theoryKey) => {
    setSelectedTheories((prev) =>
      prev.includes(theoryKey)
        ? prev.filter((key) => key !== theoryKey)
        : [...prev, theoryKey]
    );
  };

  return (
    <main className={`app ${bookStep !== "library" ? "desk-mode" : ""}`}>
      <header className="topbar">
        <button className="ghost-button" onClick={bookStep === "library" ? goLibrary : goBack}>
          {bookStep === "library" ? t.home : t.back}
        </button>

        <button className="language-button" onClick={() => setLang((prev) => (prev === "ko" ? "en" : "ko"))}>
          {t.language}
        </button>
      </header>

      {bookStep === "library" && (
        <section className="library">
          <div className="hero-card">
            <div className="hero-content">
              <p className="eyebrow">Interactive Learning Archive</p>
              <h1>{t.appTitle}</h1>
              <p className="hero-subtitle">{t.appSubtitle}</p>
            </div>
          </div>

          <section className="bookshelf-scene">
            <div className="bookshelf-header">
              <h2>{t.bookshelfTitle}</h2>
              <p>{t.bookshelfSubtitle}</p>
            </div>

            <div className="grand-bookshelf">
              {BOOKS.map((book) => (
                <button
                  key={book.id}
                  className={`standing-book ${book.className}`}
                  onClick={() => chooseBook(book.id)}
                >
                  <span className="book-spine-title">
                    {lang === "ko" ? book.koTitle : book.enTitle}
                  </span>
                  <span className="book-spine-mark">✦</span>
                </button>
              ))}
            </div>
          </section>
        </section>
      )}

      {bookStep !== "library" && currentBook && (
        <section className="book-room">
          <div className="room-title">
            <p className="eyebrow">{lang === "ko" ? currentBook.koTitle : currentBook.enTitle}</p>
            <h1>{lang === "ko" ? currentBook.koTitle : currentBook.enTitle}</h1>
            <p>{lang === "ko" ? currentBook.koDesc : currentBook.enDesc}</p>
          </div>

          {bookStep === "cover" && (
            <section className="closed-book-stage luxury-desk">
              <DeskDecorations />
              <button
                className={`closed-book-cover ${currentBook.className}`}
                onClick={() => setBookStep("toc")}
              >
                <span className="cover-ornament">✦</span>
                <strong>{lang === "ko" ? currentBook.koTitle : currentBook.enTitle}</strong>
                <small>{lang === "ko" ? currentBook.koDesc : currentBook.enDesc}</small>
                <span className="cover-action">{t.enterBook}</span>
              </button>
            </section>
          )}

          {bookStep === "toc" && (
            <section className="open-book-stage">
              <DeskDecorations />
              <div className="open-book wide-book">
                <section className="book-page full-page">
                  <div className="book-page-header">
                    <div>
                      <p className="page-kicker">{t.toc}</p>
                      <h2>{t.toc}</h2>
                    </div>
                  </div>

                  <div className="toc-grid">
                    {TOC[lang][selectedBook].map((chapter) => (
                      <button
                        key={chapter.id}
                        className="toc-card"
                        onClick={() => {
                          setSelectedChapter(chapter.id);
                          setBookStep("chapter");
                        }}
                      >
                        <strong>{chapter.title}</strong>
                        <span>{chapter.desc}</span>
                      </button>
                    ))}
                  </div>
                </section>
              </div>
            </section>
          )}

          {bookStep === "chapter" && (
            <section className="open-book-stage">
              <DeskDecorations />

              {selectedBook === "criminology" && selectedChapter === "case001" && (
                <CriminologyCase
                  t={t}
                  currentCase={currentCase}
                  collected={collected}
                  collectedItems={collectedItems}
                  selectedTheories={selectedTheories}
                  rankedTheories={rankedTheories}
                  setSelectedClue={setSelectedClue}
                  toggleTheory={toggleTheory}
                  setShowResult={setShowResult}
                  resetCurrentWork={resetCurrentWork}
                  lang={lang}
                />
              )}

              {selectedBook === "criminology" && selectedChapter === "theory" && (
                <TheoryNotes t={t} currentCase={currentCase} resetCurrentWork={resetCurrentWork} />
              )}

              {selectedBook === "statistics" && selectedChapter === "basic" && (
                <StatisticsBook cards={STATS_CARDS[lang]} resetCurrentWork={resetCurrentWork} t={t} lang={lang} />
              )}

              {selectedBook === "statistics" && selectedChapter === "advanced" && (
                <PlaceholderBook
                  title={lang === "ko" ? "고급 분석 노트" : "Advanced Analysis Notes"}
                  body={lang === "ko" ? "로지스틱 회귀, LPA, 생존분석 등은 이후 문제 카드로 확장할 수 있습니다." : "Logistic regression, LPA, and survival analysis can later be expanded into practice cards."}
                  resetCurrentWork={resetCurrentWork}
                  t={t}
                />
              )}

              {selectedBook === "methods" && selectedChapter === "quiz" && (
                <MethodsBook
                  quiz={METHOD_QUIZ[lang]}
                  methodChoice={methodChoice}
                  setMethodChoice={setMethodChoice}
                  resetCurrentWork={resetCurrentWork}
                  t={t}
                  lang={lang}
                />
              )}

              {selectedBook === "methods" && selectedChapter === "design" && (
                <PlaceholderBook
                  title={lang === "ko" ? "연구설계 노트" : "Research Design Notes"}
                  body={lang === "ko" ? "가설, 변수, 표본, 분석전략을 연결하는 학습 페이지로 확장할 수 있습니다." : "This can be expanded into a page connecting hypotheses, variables, samples, and analysis plans."}
                  resetCurrentWork={resetCurrentWork}
                  t={t}
                />
              )}

              {selectedBook === "psychology" && (
                <PlaceholderBook
                  title={t.psychologyTitle}
                  body={lang === "ko" ? "심리학 교재 기반 콘텐츠를 나중에 이곳에 추가할 수 있습니다." : "Psychology textbook-based content can be added here later."}
                  resetCurrentWork={resetCurrentWork}
                  t={t}
                />
              )}
            </section>
          )}

          {selectedClue && (
            <Modal onClose={() => {
              setSelectedClue(null);
              setWrongChoice(null);
            }}>
              <CluePaper
                t={t}
                clueKey={selectedClue}
                clue={currentCase.clues[selectedClue]}
                collectedOption={collected[selectedClue]}
                wrongChoice={wrongChoice}
                onSelect={selectEvidenceOption}
                onClose={() => {
                  setSelectedClue(null);
                  setWrongChoice(null);
                }}
              />
            </Modal>
          )}

          {showResult && (
            <Modal onClose={() => setShowResult(false)}>
              <ResultPanel
                t={t}
                selectedTheories={selectedTheories}
                rankedTheories={rankedTheories}
                theories={currentCase.theories}
                lang={lang}
              />
            </Modal>
          )}
        </section>
      )}
    </main>
  );
}

function DeskDecorations() {
  return (
    <div className="desk-decorations" aria-hidden="true">
      <div className="desk-journal"></div>
      <div className="desk-quill"></div>
      <div className="desk-inkwell"></div>
      <div className="desk-seal"></div>
      <div className="desk-candle"></div>
    </div>
  );
}

function CriminologyCase({
  t,
  currentCase,
  collected,
  collectedItems,
  selectedTheories,
  rankedTheories,
  setSelectedClue,
  toggleTheory,
  setShowResult,
  resetCurrentWork,
  lang,
}) {
  return (
    <div className="open-book criminology-book">
      <section className="book-page left-page">
        <div className="book-page-header">
          <div>
            <p className="page-kicker">{currentCase.id}</p>
            <h2>{currentCase.title}</h2>
          </div>
          <button className="small-reset-button" onClick={resetCurrentWork}>
            {t.reset}
          </button>
        </div>

        <div className="profile-grid">
          <div>
            <span>Name</span>
            <strong>{currentCase.profile.name}</strong>
          </div>
          <div>
            <span>Age</span>
            <strong>{currentCase.profile.age}</strong>
          </div>
          <div>
            <span>Offense</span>
            <strong>{currentCase.profile.offense}</strong>
          </div>
        </div>

        <p className="case-summary">{currentCase.profile.summary}</p>

        <h3>{t.interviewTitle}</h3>
        <p className="interview-text">
          {currentCase.interview.map((part, index) =>
            part.key ? (
              <button
                key={`${part.key}-${index}`}
                className={`inline-clue ${collected[part.key] ? "is-collected" : ""}`}
                onClick={() => setSelectedClue(part.key)}
              >
                {part.text}
              </button>
            ) : (
              <span key={`text-${index}`}>{part.text}</span>
            )
          )}
        </p>
      </section>

      <section className="book-page right-page">
        <h2>{t.corkBoard}</h2>

        <div className="evidence-board">
          {collectedItems.length === 0 ? (
            <p className="empty-note">
              {lang === "ko"
                ? "면담기록 속 빛나는 단어를 누르고, 히스토리에 맞는 근거를 선택하세요."
                : "Click highlighted words and choose the evidence that fits each history."}
            </p>
          ) : (
            collectedItems.map((item) => (
              <div key={item.clueKey} className="pinned-note">
                <span>{t.collected}</span>
                <strong>{item.label}</strong>
                <small>
                  {lang === "ko" ? "분석 단서로 저장됨" : "Saved as an analysis clue"}
                </small>
              </div>
            ))
          )}
        </div>

        <div className="theory-select">
          <h3>{t.selectTheory}</h3>
          {Object.entries(currentCase.theories).map(([key, theory]) => (
            <label key={key} className="checkbox-row">
              <input
                type="checkbox"
                checked={selectedTheories.includes(key)}
                onChange={() => toggleTheory(key)}
              />
              <span>{theory.name}</span>
            </label>
          ))}
        </div>

        <button
          className="primary-button"
          disabled={collectedItems.length === 0 || selectedTheories.length === 0}
          onClick={() => setShowResult(true)}
        >
          {t.analyze}
        </button>
      </section>
    </div>
  );
}

function CluePaper({ t, clueKey, clue, collectedOption, wrongChoice, onSelect, onClose }) {
  return (
    <article className="clue-paper">
      <p className="paper-label">{clue.title}</p>
      <h2>{clue.title}</h2>
      <p className="paper-body">{clue.detail}</p>

      <div className="option-question">
        <h3>{t.chooseEvidence}</h3>

        <div className="evidence-option-grid">
          {clue.options.map((option) => {
            const isCollected = collectedOption?.id === option.id;
            const isWrong = wrongChoice === option.id;

            return (
              <button
                key={option.id}
                className={`evidence-option ${isCollected ? "is-correct" : ""} ${isWrong ? "is-wrong" : ""}`}
                onClick={() => {
                  if (!collectedOption) onSelect(clueKey, option);
                }}
                aria-disabled={Boolean(collectedOption)}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {collectedOption && (
          <button className="collected-close-button" onClick={onClose}>
            {t.correct}
          </button>
        )}

        {wrongChoice && !collectedOption && (
          <p className="feedback bad">{t.incorrect}</p>
        )}
      </div>
    </article>
  );
}

function ResultPanel({ t, selectedTheories, rankedTheories, theories, lang }) {
  const best = rankedTheories.find((theory) => theory.score > 0);
  const selected = selectedTheories.map((key) => ({ key, ...theories[key] }));

  return (
    <article className="result-panel">
      <p className="paper-label">{t.resultTitle}</p>
      <h2>{t.recommended}</h2>

      {best ? (
        <div className="result-main">
          <h3>{best.name}</h3>
          <div className="score-bar">
            <span style={{ width: `${Math.min(best.score * 25, 100)}%` }} />
          </div>
          <p>{best.explanation}</p>
        </div>
      ) : (
        <p className="muted-dark">
          {lang === "ko" ? "아직 충분한 근거가 수집되지 않았습니다." : "Not enough evidence has been collected yet."}
        </p>
      )}

      <h3>{t.additional}</h3>
      <div className="result-list">
        {selected.map((theory) => (
          <div key={theory.key} className="result-item">
            <strong>{theory.name}</strong>
            <span>{theory.scholar}</span>
            <p>{theory.explanation}</p>
          </div>
        ))}
      </div>

      <h3 className="source-heading">{t.sourceTitle}</h3>
      <ul className="source-list">
        {Object.entries(theories).map(([key, theory]) => (
          <li key={key}>
            <strong>{theory.scholar}</strong> — {theory.source}
          </li>
        ))}
      </ul>
    </article>
  );
}

function TheoryNotes({ t, currentCase, resetCurrentWork }) {
  return (
    <div className="open-book wide-book">
      <section className="book-page full-page">
        <div className="book-page-header">
          <div>
            <p className="page-kicker">Theory Notes</p>
            <h2>범죄학 이론 노트</h2>
          </div>
          <button className="small-reset-button" onClick={resetCurrentWork}>
            {t.reset}
          </button>
        </div>

        <div className="method-card-grid">
          {Object.entries(currentCase.theories).map(([key, theory]) => (
            <article className="method-card" key={key}>
              <h3>{theory.name}</h3>
              <p className="question">{theory.scholar}</p>
              <p>{theory.explanation}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatisticsBook({ cards, resetCurrentWork, t, lang }) {
  return (
    <div className="open-book wide-book">
      <section className="book-page full-page">
        <div className="book-page-header">
          <div>
            <p className="page-kicker">{lang === "ko" ? "Statistics" : "Statistics"}</p>
            <h2>{lang === "ko" ? "기초 통계방법론" : "Basic Statistical Methods"}</h2>
          </div>
        </div>

        <div className="method-card-grid">
          {cards.map((card) => (
            <article className="method-card" key={card.title}>
              <h3>{card.title}</h3>
              <p className="question">{card.question}</p>
              <p>
                <strong>{lang === "ko" ? "예시" : "Example"}:</strong> {card.example}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function MethodsBook({ quiz, methodChoice, setMethodChoice, resetCurrentWork, t, lang }) {
  return (
    <div className="open-book wide-book">
      <section className="book-page full-page">
        <article className="lab-card">
          <div className="book-page-header">
            <div>
              <p className="page-kicker">Research Methods</p>
              <h2>{lang === "ko" ? "분석방법 선택 훈련" : "Choosing an Analysis Method"}</h2>
            </div>
            <button className="small-reset-button" onClick={resetCurrentWork}>
              {t.reset}
            </button>
          </div>

          <h3>{quiz.question}</h3>

          <div className="variable-list">
            {quiz.variables.map((variable) => (
              <div key={variable}>{variable}</div>
            ))}
          </div>

          <div className="option-grid">
            {quiz.options.map((option) => (
              <button
                key={option}
                className={`option-button ${methodChoice === option ? "is-selected" : ""}`}
                onClick={() => setMethodChoice(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {methodChoice && (
            <div className={`feedback-box ${methodChoice === quiz.answer ? "correct" : "incorrect"}`}>
              <h3>
                {methodChoice === quiz.answer
                  ? lang === "ko"
                    ? "적절한 선택입니다."
                    : "Good choice."
                  : lang === "ko"
                    ? "다시 생각해볼 필요가 있습니다."
                    : "Think again."}
              </h3>
              <p>{quiz.explanation}</p>
            </div>
          )}
        </article>
      </section>
    </div>
  );
}

function PlaceholderBook({ title, body, resetCurrentWork, t }) {
  return (
    <div className="open-book wide-book">
      <section className="book-page full-page">
        <div className="book-page-header">
          <div>
            <p className="page-kicker">Archive</p>
            <h2>{title}</h2>
          </div>
          <button className="small-reset-button" onClick={resetCurrentWork}>
            {t.reset}
          </button>
        </div>
        <div className="coming-soon-card">
          <span>Coming Soon</span>
          <p>{body}</p>
        </div>
      </section>
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="floating-paper" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

export default App;