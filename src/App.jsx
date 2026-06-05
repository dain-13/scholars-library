import { useMemo, useState } from "react";
import "./App.css";

const TEXT = {
  ko: {
    appTitle: "학자의 서재",
    appSubtitle: "범죄학, 통계학, 연구방법론을 직접 읽고 판단하는 학습형 아카이브",
    language: "EN",
    home: "서재로 돌아가기",
    back: "이전으로",
    reset: "초기화",
    toc: "목차",
    open: "열기",
    comingSoon: "준비 중",

    criminology: "범죄학",
    statistics: "통계학",
    methods: "연구방법론",
    psychology: "심리학",

    criminologyDesc: "면담기록 속 단서를 읽고 범죄학 이론으로 설명합니다.",
    statisticsDesc: "통계방법론을 언제, 왜 쓰는지 이해합니다.",
    methodsDesc: "연구질문과 분석방법을 연결합니다.",
    psychologyDesc: "심리학 교재 기반 콘텐츠로 확장 예정입니다.",

    interviewTitle: "면담기록",
    chooseEvidence: "이 히스토리는 어떤 근거로 볼 수 있을까요?",
    correct: "근거 수집 완료",
    incorrect: "다시 생각해보세요. 히스토리의 핵심 단서를 더 살펴보세요.",
    collectedEvidence: "수집한 근거",
    selectTheory: "수집한 근거를 바탕으로 가장 적합한 이론을 선택하세요",
    analyze: "분석 결과 보기",
    resultTitle: "분석 결과",
    yourChoice: "당신이 선택한 이론",
    bestTheory: "가장 적합한 이론",
    evidenceMap: "수집한 근거와 이론의 연결",
    sourceTitle: "참고문헌",
    noEvidence: "아직 수집한 근거가 없습니다.",
    theoryWeight: "이론별 설명 비중",
    appropriateChoice: "적절한 선택",
    compareChoice: "다시 비교해볼 선택",
    missedClues: "아직 확인하지 않은 단서",
  },
  en: {
    appTitle: "The Scholar's Library",
    appSubtitle: "An interactive archive for studying criminology, statistics, and research methods",
    language: "KO",
    home: "Back to Library",
    back: "Back",
    reset: "Reset",
    toc: "Table of Contents",
    open: "Open",
    comingSoon: "Coming Soon",

    criminology: "Criminology",
    statistics: "Statistics",
    methods: "Research Methods",
    psychology: "Psychology",

    criminologyDesc: "Read interview clues and explain the case through criminological theories.",
    statisticsDesc: "Understand when and why statistical methods are used.",
    methodsDesc: "Connect research questions with analytic choices.",
    psychologyDesc: "A future space based on psychology textbook content.",

    interviewTitle: "Interview Record",
    chooseEvidence: "What kind of evidence does this history suggest?",
    correct: "Evidence collected",
    incorrect: "Think again. Focus on the core clue in the history.",
    collectedEvidence: "Collected Evidence",
    selectTheory: "Select the theory that best fits the evidence",
    analyze: "View Analysis",
    resultTitle: "Analysis Result",
    yourChoice: "Your Selected Theory",
    bestTheory: "Most Fitting Theory",
    evidenceMap: "Evidence-Theory Connections",
    sourceTitle: "References",
    noEvidence: "No evidence collected yet.",
    theoryWeight: "Theory Weight",
    appropriateChoice: "Appropriate Choice",
    compareChoice: "Needs Comparison",
    missedClues: "Unchecked Clues",
  },
};

const BOOKS = [
  {
    id: "criminology",
    koTitle: "범죄학",
    enTitle: "Criminology",
    koDesc: "사례를 읽고 근거를 수집하여 이론으로 설명합니다.",
    enDesc: "Explain a case by collecting evidence and applying theory.",
  },
  {
    id: "statistics",
    koTitle: "통계학",
    enTitle: "Statistics",
    koDesc: "통계방법론의 사용 조건과 해석을 이해합니다.",
    enDesc: "Understand conditions and interpretations of statistical methods.",
  },
  {
    id: "methods",
    koTitle: "연구방법론",
    enTitle: "Research Methods",
    koDesc: "연구질문과 변수 형태에 맞는 분석방법을 선택합니다.",
    enDesc: "Choose methods based on research questions and variables.",
  },
  {
    id: "psychology",
    koTitle: "심리학",
    enTitle: "Psychology",
    koDesc: "심리학 이론과 실험 콘텐츠를 준비 중입니다.",
    enDesc: "Psychology theory and experiment content will be added later.",
  },
];

const TOC = {
  ko: {
    criminology: [
      {
        id: "case001",
        title: "Case 001. 청소년 절도 사례",
        desc: "면담기록 속 단서를 읽고 근거를 수집한 뒤, 가장 적합한 범죄학 이론을 판단합니다.",
      },
      {
        id: "theory",
        title: "범죄학 이론 노트",
        desc: "사회유대이론, 사회학습이론, 일반긴장이론, 낙인이론의 핵심을 비교합니다.",
      },
    ],
    statistics: [
      {
        id: "basic",
        title: "기초 통계방법론",
        desc: "t검정, 상관분석, 회귀분석, 카이제곱 검정의 사용 맥락을 정리합니다.",
      },
      {
        id: "advanced",
        title: "고급 분석 노트",
        desc: "로지스틱 회귀, 잠재프로파일분석, 생존분석 등으로 확장할 수 있습니다.",
      },
    ],
    methods: [
      {
        id: "quiz",
        title: "분석방법 선택 훈련",
        desc: "연구질문과 변수 형태를 보고 적절한 분석방법을 선택합니다.",
      },
      {
        id: "design",
        title: "연구설계 노트",
        desc: "가설, 변수, 표본, 분석전략을 연결하는 학습 페이지입니다.",
      },
    ],
    psychology: [
      {
        id: "coming",
        title: "심리학 교재 기반 확장 예정",
        desc: "심리학 이론 카드와 실험형 학습 페이지를 추가할 수 있습니다.",
      },
    ],
  },
  en: {
    criminology: [
      {
        id: "case001",
        title: "Case 001. Juvenile Theft Case",
        desc: "Read interview clues, collect evidence, and judge the most fitting criminological theory.",
      },
      {
        id: "theory",
        title: "Criminology Theory Notes",
        desc: "Compare social bond, social learning, general strain, and labeling theories.",
      },
    ],
    statistics: [
      {
        id: "basic",
        title: "Basic Statistical Methods",
        desc: "Review when to use t-tests, correlation, regression, and chi-square tests.",
      },
      {
        id: "advanced",
        title: "Advanced Analysis Notes",
        desc: "Expand later into logistic regression, LPA, and survival analysis.",
      },
    ],
    methods: [
      {
        id: "quiz",
        title: "Choosing an Analysis Method",
        desc: "Choose the appropriate method based on research questions and variable types.",
      },
      {
        id: "design",
        title: "Research Design Notes",
        desc: "Connect hypotheses, variables, samples, and analysis strategies.",
      },
    ],
    psychology: [
      {
        id: "coming",
        title: "Psychology Textbook Expansion",
        desc: "Future theory cards and experiment-based pages.",
      },
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
      {
        text:
          " 안에서 잦은 갈등을 경험했다고 진술하였다. 보호자는 생계 문제로 귀가가 늦었고, 대상자의 귀가 시간이나 친구 관계를 지속적으로 확인하기 어려웠다. 중학교에 진학한 이후에는 ",
        key: null,
      },
      { text: "학교", key: "school" },
      {
        text:
          " 생활에 흥미를 잃기 시작했고, 중학교 2학년 이후 지각과 결석이 증가하였다. 이후 대상자는 동네에서 만난 ",
        key: null,
      },
      { text: "친구", key: "peer" },
      {
        text:
          "들과 자주 어울리게 되었으며, 그중 일부는 이미 절도와 무단결석 경험이 있었다. 대상자는 이들과 시간을 보내며 처음으로 절도 방법을 알게 되었다고 말했다. 면담 중 대상자는 자신이 어디에서도 인정받지 못한다고 느꼈으며, 최근에는 사소한 일에도 쉽게 분노가 올라온다고 표현했다. 특히 학교에서 자신을 이미 ",
        key: null,
      },
      { text: "문제학생", key: "labeling" },
      {
        text:
          "으로 보는 분위기가 있었다고 말하면서, ‘어차피 나를 믿어주는 사람은 없다’고 진술하였다.",
        key: null,
      },
    ],
    clues: {
      family: {
        title: "가족 히스토리",
        detail:
          "부모는 대상자가 초등학교 고학년일 때부터 잦은 갈등을 보였다. 보호자는 생계 문제로 늦게 귀가하는 일이 많았고, 대상자의 귀가 시간이나 친구 관계를 지속적으로 확인하기 어려웠다.",
        options: [
          {
            id: "weak_supervision",
            label: "부모감독 약화",
            theory: "socialBond",
            correct: true,
            explanation:
              "보호자가 귀가 시간과 친구 관계를 확인하기 어려웠다는 점은 부모감독의 약화로 해석할 수 있습니다. 이는 사회유대이론에서 애착과 감독의 약화가 비행 가능성을 높일 수 있다는 설명과 연결됩니다.",
          },
          { id: "high_self_control", label: "높은 자기통제력", theory: "selfControl", correct: false },
          { id: "peer_reinforcement", label: "또래 강화", theory: "socialLearning", correct: false },
        ],
      },
      school: {
        title: "학교생활 히스토리",
        detail:
          "중학교 2학년 이후 지각과 결석이 증가했다. 담임교사는 대상자가 수업에 흥미를 잃고, 학교생활에서 소속감을 느끼지 못하는 것 같다고 기록했다.",
        options: [
          {
            id: "school_commitment",
            label: "학교 몰입 저하",
            theory: "socialBond",
            correct: true,
            explanation:
              "수업 흥미 저하, 결석 증가, 소속감 약화는 학교에 대한 몰입과 유대가 약해진 단서입니다. 이는 사회유대이론과 연결됩니다.",
          },
          { id: "formal_label", label: "공식적 낙인", theory: "labeling", correct: false },
          { id: "criminal_skill", label: "범죄기술 학습", theory: "socialLearning", correct: false },
        ],
      },
      peer: {
        title: "친구관계 히스토리",
        detail:
          "최근 어울리는 친구들 중 일부는 절도와 무단결석 경험이 있었다. 대상자는 친구들과 함께 시간을 보내며 처음으로 절도 방법을 알게 되었다고 진술했다.",
        options: [
          {
            id: "delinquent_peer",
            label: "비행친구와의 접촉",
            theory: "socialLearning",
            correct: true,
            explanation:
              "절도 경험이 있는 친구들과 어울리고, 그들과 함께 시간을 보내며 절도 방법을 알게 되었다는 점은 사회학습이론의 핵심 단서입니다.",
          },
          { id: "school_attachment", label: "학교 애착 강화", theory: "socialBond", correct: false },
          { id: "negative_emotion", label: "부정적 감정", theory: "generalStrain", correct: false },
        ],
      },
      labeling: {
        title: "학교 평가 히스토리",
        detail:
          "학교에서는 대상자를 ‘문제학생’으로 인식하는 분위기가 형성되어 있었다. 대상자는 교사와 또래가 자신을 이미 나쁜 학생으로 본다고 느꼈다.",
        options: [
          {
            id: "labeling_experience",
            label: "낙인 경험",
            theory: "labeling",
            correct: true,
            explanation:
              "주변에서 자신을 문제학생으로 본다고 느끼는 경험은 낙인이론과 연결됩니다. 반복적인 부정적 규정은 자기인식과 행동 선택에 영향을 줄 수 있습니다.",
          },
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
          { id: "weak_supervision", label: "Weak parental supervision", theory: "socialBond", correct: true, explanation: "Difficulty monitoring curfew and peer relationships suggests weakened parental supervision. This connects to social bond theory." },
          { id: "high_self_control", label: "High self-control", theory: "selfControl", correct: false },
          { id: "peer_reinforcement", label: "Peer reinforcement", theory: "socialLearning", correct: false },
        ],
      },
      school: {
        title: "School History",
        detail:
          "Tardiness and absenteeism increased. The teacher noted that the youth had lost interest in class and felt little belonging at school.",
        options: [
          { id: "school_commitment", label: "Weak school commitment", theory: "socialBond", correct: true, explanation: "Loss of interest, absenteeism, and low belonging suggest weakened school commitment, which connects to social bond theory." },
          { id: "formal_label", label: "Formal labeling", theory: "labeling", correct: false },
          { id: "criminal_skill", label: "Learning criminal skills", theory: "socialLearning", correct: false },
        ],
      },
      peer: {
        title: "Peer History",
        detail:
          "Some of the youth's recent friends had histories of theft and truancy. The youth first learned how to steal while spending time with those peers.",
        options: [
          { id: "delinquent_peer", label: "Contact with delinquent peers", theory: "socialLearning", correct: true, explanation: "Spending time with delinquent peers and learning how to steal directly connects to social learning theory." },
          { id: "school_attachment", label: "Strong school attachment", theory: "socialBond", correct: false },
          { id: "negative_emotion", label: "Negative emotion", theory: "generalStrain", correct: false },
        ],
      },
      labeling: {
        title: "Teacher Evaluation History",
        detail:
          "At school, the youth was widely perceived as a problem student. The youth felt that teachers and peers already viewed them as bad.",
        options: [
          { id: "labeling_experience", label: "Labeling experience", theory: "labeling", correct: true, explanation: "Being treated as a problem student can shape identity and behavior, which connects to labeling theory." },
          { id: "parental_monitoring", label: "Strong parental monitoring", theory: "socialBond", correct: false },
          { id: "low_opportunity", label: "Lack of criminal opportunity", theory: "rationalChoice", correct: false },
        ],
      },
    },
    theories: {
      socialLearning: {
        name: "Social Learning Theory",
        scholar: "Ronald Akers",
        explanation: "This theory fits when delinquent peers, learned techniques, and reinforcement are present.",
        source: "Akers, R. L. (1998). Social Learning and Social Structure.",
      },
      socialBond: {
        name: "Social Bond Theory",
        scholar: "Travis Hirschi",
        explanation: "This theory fits when attachment, commitment, involvement, or belief are weakened.",
        source: "Hirschi, T. (1969). Causes of Delinquency.",
      },
      generalStrain: {
        name: "General Strain Theory",
        scholar: "Robert Agnew",
        explanation: "This theory focuses on strain, anger, frustration, and negative emotions.",
        source: "Agnew, R. (1992). Foundation for a general strain theory of crime and delinquency.",
      },
      labeling: {
        name: "Labeling Theory",
        scholar: "Howard Becker",
        explanation: "This theory focuses on how being labeled deviant can shape identity and behavior.",
        source: "Becker, H. S. (1963). Outsiders.",
      },
      selfControl: {
        name: "Self-Control Theory",
        scholar: "Gottfredson & Hirschi",
        explanation: "This theory explains crime through impulsivity and preference for immediate gratification.",
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
    explanation: "종속변수가 0/1로 코딩된 이분형 변수이므로 로지스틱 회귀가 적합합니다.",
  },
  en: {
    question: "Does the number of delinquent peers affect entry into late-onset delinquency?",
    variables: ["IV: Number of delinquent peers", "DV: Late-onset delinquency entry (0 = No, 1 = Yes)"],
    options: ["Correlation", "t-test", "Logistic Regression", "One-way ANOVA"],
    answer: "Logistic Regression",
    explanation: "Because the dependent variable is binary, logistic regression is appropriate.",
  },
};

function App() {
  const [lang, setLang] = useState("ko");
  const [selectedBook, setSelectedBook] = useState(null);
  const [step, setStep] = useState("library"); // library, toc, chapter
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedClue, setSelectedClue] = useState(null);
  const [collected, setCollected] = useState({});
  const [wrongChoice, setWrongChoice] = useState(null);
  const [selectedTheory, setSelectedTheory] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [methodChoice, setMethodChoice] = useState(null);

  const t = TEXT[lang];
  const currentCase = CASE[lang];
  const currentBook = BOOKS.find((book) => book.id === selectedBook);

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

  const bestTheory = rankedTheories.find((theory) => theory.score > 0);

  const goHome = () => {
    setSelectedBook(null);
    setSelectedChapter(null);
    setStep("library");
    setShowResult(false);
    setSelectedClue(null);
  };

  const goBack = () => {
    if (step === "chapter") {
      setStep("toc");
      setSelectedChapter(null);
      setSelectedClue(null);
      setShowResult(false);
      return;
    }
    if (step === "toc") goHome();
  };

  const openBook = (bookId) => {
    setSelectedBook(bookId);
    setSelectedChapter(null);
    setStep("toc");
  };

  const resetCriminologyCase = () => {
    setSelectedClue(null);
    setCollected({});
    setWrongChoice(null);
    setSelectedTheory("");
    setShowResult(false);
  };

  const selectEvidenceOption = (clueKey, option) => {
    if (!option.correct) {
      setWrongChoice(option.id);
      return;
    }
    setCollected((prev) => ({ ...prev, [clueKey]: option }));
    setWrongChoice(null);
  };

  return (
    <main className={`app ${step !== "library" ? "study-mode" : ""}`}>
      <header className="topbar">
        <button className="nav-button" onClick={step === "library" ? goHome : goBack}>
          {step === "library" ? t.home : t.back}
        </button>

        <button className="lang-button" onClick={() => setLang((prev) => (prev === "ko" ? "en" : "ko"))}>
          {t.language}
        </button>
      </header>

      {step === "library" && (
        <section className="library-page">
          <section className="hero-section">
            <div className="eyebrow">Interactive Learning Archive</div>
            <h1>{t.appTitle}</h1>
            <p>{t.appSubtitle}</p>
          </section>

          <section className="shelf-panel">
            <div className="section-heading">
              <h2>{lang === "ko" ? "학문 선택" : "Select a Discipline"}</h2>
              <p>{lang === "ko" ? "책을 고르면 해당 학문의 목차로 이동합니다." : "Choose a book to open its table of contents."}</p>
            </div>

            <div className="book-grid">
              {BOOKS.map((book) => (
                <button key={book.id} className="book-card" onClick={() => openBook(book.id)}>
                  <span className="book-label">{lang === "ko" ? book.koTitle : book.enTitle}</span>
                  <strong>{lang === "ko" ? book.koTitle : book.enTitle}</strong>
                  <p>{lang === "ko" ? book.koDesc : book.enDesc}</p>
                  <em>{t.open}</em>
                </button>
              ))}
            </div>
          </section>
        </section>
      )}

      {step !== "library" && currentBook && (
        <section className="study-page">
          <section className="study-title">
            <div className="eyebrow">{lang === "ko" ? currentBook.koTitle : currentBook.enTitle}</div>
            <h1>{lang === "ko" ? currentBook.koTitle : currentBook.enTitle}</h1>
            <p>{lang === "ko" ? currentBook.koDesc : currentBook.enDesc}</p>
          </section>

          {step === "toc" && (
            <section className="paper-panel">
              <div className="panel-header">
                <div>
                  <div className="eyebrow">{t.toc}</div>
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
                      setStep("chapter");
                    }}
                  >
                    <strong>{chapter.title}</strong>
                    <span>{chapter.desc}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {step === "chapter" && selectedBook === "criminology" && selectedChapter === "case001" && (
            <CriminologyCase
              t={t}
              lang={lang}
              currentCase={currentCase}
              collected={collected}
              collectedItems={collectedItems}
              selectedTheory={selectedTheory}
              setSelectedTheory={setSelectedTheory}
              setSelectedClue={setSelectedClue}
              setShowResult={setShowResult}
              resetCriminologyCase={resetCriminologyCase}
            />
          )}

          {step === "chapter" && selectedBook === "criminology" && selectedChapter === "theory" && <TheoryNotes currentCase={currentCase} lang={lang} />}
          {step === "chapter" && selectedBook === "statistics" && selectedChapter === "basic" && <StatisticsBook cards={STATS_CARDS[lang]} lang={lang} />}
          {step === "chapter" && selectedBook === "statistics" && selectedChapter === "advanced" && (
            <Placeholder
              title={lang === "ko" ? "고급 분석 노트" : "Advanced Analysis Notes"}
              body={lang === "ko" ? "로지스틱 회귀, LPA, 생존분석 등은 이후 문제 카드로 확장할 수 있습니다." : "Logistic regression, LPA, and survival analysis can later be expanded into practice cards."}
            />
          )}
          {step === "chapter" && selectedBook === "methods" && selectedChapter === "quiz" && (
            <MethodsBook quiz={METHOD_QUIZ[lang]} methodChoice={methodChoice} setMethodChoice={setMethodChoice} lang={lang} />
          )}
          {step === "chapter" && selectedBook === "methods" && selectedChapter === "design" && (
            <Placeholder
              title={lang === "ko" ? "연구설계 노트" : "Research Design Notes"}
              body={lang === "ko" ? "가설, 변수, 표본, 분석전략을 연결하는 학습 페이지로 확장할 수 있습니다." : "This can be expanded into a page connecting hypotheses, variables, samples, and analysis plans."}
            />
          )}
          {step === "chapter" && selectedBook === "psychology" && (
            <Placeholder
              title={t.psychology}
              body={lang === "ko" ? "심리학 교재 기반 콘텐츠를 나중에 이곳에 추가할 수 있습니다." : "Psychology textbook-based content can be added here later."}
            />
          )}

          {selectedClue && (
            <Modal onClose={() => { setSelectedClue(null); setWrongChoice(null); }}>
              <CluePaper
                t={t}
                clueKey={selectedClue}
                clue={currentCase.clues[selectedClue]}
                collectedOption={collected[selectedClue]}
                wrongChoice={wrongChoice}
                onSelect={selectEvidenceOption}
                onClose={() => { setSelectedClue(null); setWrongChoice(null); }}
              />
            </Modal>
          )}

          {showResult && (
            <Modal onClose={() => setShowResult(false)}>
              <ResultPanel
                t={t}
                lang={lang}
                theories={currentCase.theories}
                selectedTheory={selectedTheory}
                bestTheory={bestTheory}
                collectedItems={collectedItems}
              />
            </Modal>
          )}
        </section>
      )}
    </main>
  );
}

function CriminologyCase({ t, lang, currentCase, collected, collectedItems, selectedTheory, setSelectedTheory, setSelectedClue, setShowResult, resetCriminologyCase }) {
  return (
    <section className="case-layout">
      <article className="paper-panel case-main">
        <div className="panel-header">
          <div>
            <div className="eyebrow">{currentCase.id}</div>
            <h2>{currentCase.title}</h2>
          </div>
          <button className="small-button" onClick={resetCriminologyCase}>{t.reset}</button>
        </div>

        <div className="profile-grid">
          <div><span>Name</span><strong>{currentCase.profile.name}</strong></div>
          <div><span>Age</span><strong>{currentCase.profile.age}</strong></div>
          <div><span>Offense</span><strong>{currentCase.profile.offense}</strong></div>
        </div>

        <p className="case-summary">{currentCase.profile.summary}</p>
        <h3>{t.interviewTitle}</h3>
        <p className="interview-text">
          {currentCase.interview.map((part, index) =>
            part.key ? (
              <button key={`${part.key}-${index}`} className={`inline-clue ${collected[part.key] ? "is-collected" : ""}`} onClick={() => setSelectedClue(part.key)}>
                {part.text}
              </button>
            ) : (
              <span key={`text-${index}`}>{part.text}</span>
            )
          )}
        </p>
      </article>

      <aside className="paper-panel evidence-side">
        <h2>{t.collectedEvidence}</h2>
        <div className="evidence-board">
          {collectedItems.length === 0 ? (
            <p className="empty-note">{t.noEvidence}</p>
          ) : (
            collectedItems.map((item) => (
              <div className="evidence-note" key={item.clueKey}>
                <strong>{item.label}</strong>
                <span>{lang === "ko" ? "분석 단서로 저장됨" : "Saved as an analysis clue"}</span>
              </div>
            ))
          )}
        </div>

        <div className="theory-box">
          <h3>{t.selectTheory}</h3>
          <div className="theory-options">
            {Object.entries(currentCase.theories).map(([key, theory]) => (
              <label key={key} className="radio-row">
                <input type="radio" name="theory" checked={selectedTheory === key} onChange={() => setSelectedTheory(key)} />
                <span>{theory.name}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="primary-button" disabled={collectedItems.length === 0 || !selectedTheory} onClick={() => setShowResult(true)}>
          {t.analyze}
        </button>
      </aside>
    </section>
  );
}

function CluePaper({ t, clueKey, clue, collectedOption, wrongChoice, onSelect, onClose }) {
  return (
    <article className="clue-paper">
      <div className="eyebrow">{clue.title}</div>
      <h2>{clue.title}</h2>
      <p className="paper-body">{clue.detail}</p>
      <div className="option-question">
        <h3>{t.chooseEvidence}</h3>
        <div className="evidence-option-grid">
          {clue.options.map((option) => {
            const isCollected = collectedOption?.id === option.id;
            const isWrong = wrongChoice === option.id;
            return (
              <button key={option.id} className={`evidence-option ${isCollected ? "is-correct" : ""} ${isWrong ? "is-wrong" : ""}`} onClick={() => { if (!collectedOption) onSelect(clueKey, option); }} aria-disabled={Boolean(collectedOption)}>
                {option.label}
              </button>
            );
          })}
        </div>
        {collectedOption && <button className="collected-close-button" onClick={onClose}>{t.correct}</button>}
        {wrongChoice && !collectedOption && <p className="feedback bad">{t.incorrect}</p>}
      </div>
    </article>
  );
}

function ResultPanel({ t, lang, theories, selectedTheory, bestTheory, collectedItems }) {
  const userTheory = theories[selectedTheory];
  const scoreMap = collectedItems.reduce((acc, item) => {
    acc[item.theory] = (acc[item.theory] || 0) + 1;
    return acc;
  }, {});
  const total = collectedItems.length || 1;
  const theoryEntries = Object.entries(theories)
    .map(([key, theory]) => ({ key, ...theory, count: scoreMap[key] || 0, percent: Math.round(((scoreMap[key] || 0) / total) * 100) }))
    .filter((item) => item.count > 0);
  const isCorrect = bestTheory && selectedTheory === bestTheory.key;

  return (
    <article className="result-panel">
      <h2>{t.resultTitle}</h2>

      {bestTheory && (
        <section className="result-block primary-result">
          <h3>{t.bestTheory}: {bestTheory.name}</h3>
          <p>{bestTheory.explanation}</p>
          <p className="result-reason">
            {lang === "ko" ? "이 사례에서 수집된 근거들이 가장 많이 연결되는 이론입니다." : "This is the theory most strongly connected to the evidence collected in this case."}
          </p>
        </section>
      )}

      <section className="result-block chart-section">
        <h3>{t.theoryWeight}</h3>
        <div className="chart-layout">
          <PieChart entries={theoryEntries} />
          <div className="chart-legend">
            {theoryEntries.map((entry, index) => (
              <div key={entry.key}>
                <span className={`legend-dot color-${index}`} />
                <strong>{entry.name}</strong>
                <em>{entry.percent}%</em>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`judgement-card ${isCorrect ? "correct" : "partial"}`}>
        <span>{isCorrect ? t.appropriateChoice : t.compareChoice}</span>
        <h3>{t.yourChoice}: {userTheory?.name}</h3>
        {isCorrect ? (
          <p>{lang === "ko" ? "당신이 선택한 이론은 수집된 근거와 가장 잘 일치합니다." : "Your selected theory matches the collected evidence best."}</p>
        ) : (
          <p>{lang === "ko" ? `${userTheory?.name}도 일부 단서를 설명할 수 있지만, 현재 수집된 근거의 비중상 ${bestTheory?.name}이 더 적합합니다.` : `${userTheory?.name} can explain some clues, but based on the collected evidence, ${bestTheory?.name} is more fitting.`}</p>
        )}
      </section>

      <section className="result-block">
        <h3>{t.evidenceMap}</h3>
        <div className="evidence-map">
          {collectedItems.map((item) => (
            <div key={item.clueKey} className="evidence-map-item">
              <strong>{item.label}</strong>
              <p>{item.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="result-block reference-block">
        <h3>{t.sourceTitle}</h3>
        <ul className="source-list left-source-list">
          {Object.entries(theories).map(([key, theory]) => (
            <li key={key}><strong>{theory.scholar}</strong> — {theory.source}</li>
          ))}
        </ul>
      </section>
    </article>
  );
}

function PieChart({ entries }) {
  if (entries.length === 0) return null;
  let cumulative = 0;
  const gradientParts = entries.map((entry, index) => {
    const start = cumulative;
    cumulative += entry.percent;
    return `var(--chart-${index}) ${start}% ${cumulative}%`;
  });
  return (
    <div className="pie-chart" style={{ background: `conic-gradient(${gradientParts.join(", ")})` }}>
      <div><strong>100%</strong><span>Evidence</span></div>
    </div>
  );
}

function TheoryNotes({ currentCase, lang }) {
  const [selectedTheoryNote, setSelectedTheoryNote] = useState(null);
  const detailText = {
    socialLearning: lang === "ko" ? "사회학습이론은 범죄와 비행이 타인과의 상호작용 속에서 학습된다고 봅니다. 특히 비행친구와의 접촉, 범죄기술의 학습, 비행을 정당화하는 태도, 또래의 강화가 핵심 단서가 됩니다." : "Social learning theory argues that crime and delinquency are learned through interaction with others, especially delinquent peers, learned techniques, definitions favorable to crime, and reinforcement.",
    socialBond: lang === "ko" ? "사회유대이론은 개인이 사회와 맺는 유대가 약해질수록 비행 가능성이 높아진다고 봅니다. 애착, 전념, 참여, 신념이 약화되는 상황을 중요하게 봅니다." : "Social bond theory explains delinquency through weakened attachment, commitment, involvement, and belief.",
    generalStrain: lang === "ko" ? "일반긴장이론은 좌절, 상실, 부정적 자극 등으로 발생한 긴장이 분노와 같은 부정적 감정을 만들고, 이것이 비행으로 이어질 수 있다고 설명합니다." : "General strain theory explains delinquency through strain, frustration, loss, and negative emotions such as anger.",
    labeling: lang === "ko" ? "낙인이론은 개인이 문제아, 비행청소년, 범죄자 등으로 규정되는 과정이 자기인식과 사회적 관계를 변화시키고, 이후 일탈 행동을 강화할 수 있다고 봅니다." : "Labeling theory focuses on how being defined as deviant can shape identity, relationships, and later deviant behavior.",
    selfControl: lang === "ko" ? "자기통제이론은 낮은 자기통제력, 충동성, 즉각적 만족 추구, 위험 선호가 범죄와 비행의 핵심 원인이라고 설명합니다." : "Self-control theory explains crime through low self-control, impulsivity, risk-seeking, and preference for immediate gratification.",
  };

  return (
    <section className="paper-panel">
      <div className="panel-header"><div><div className="eyebrow">Theory Notes</div><h2>{lang === "ko" ? "범죄학 이론 노트" : "Criminology Theory Notes"}</h2></div></div>
      <div className="card-grid">
        {Object.entries(currentCase.theories).map(([key, theory]) => (
          <button type="button" className="info-card clickable-card" key={key} onClick={() => setSelectedTheoryNote({ key, ...theory })}>
            <h3>{theory.name}</h3><span>{theory.scholar}</span><p>{theory.explanation}</p>
          </button>
        ))}
      </div>
      {selectedTheoryNote && (
        <Modal onClose={() => setSelectedTheoryNote(null)}>
          <article className="theory-detail">
            <div className="eyebrow">Theory Detail</div><h2>{selectedTheoryNote.name}</h2><p>{detailText[selectedTheoryNote.key]}</p>
            <h3>{lang === "ko" ? "참고문헌" : "References"}</h3>
            <ul className="source-list left-source-list"><li><strong>{selectedTheoryNote.scholar}</strong> — {selectedTheoryNote.source}</li></ul>
          </article>
        </Modal>
      )}
    </section>
  );
}

function StatisticsBook({ cards, lang }) {
  const [selectedStat, setSelectedStat] = useState(null);
  const statDetails = {
    "t검정": { title: "t검정", desc: "t검정은 두 집단의 평균 차이가 통계적으로 유의한지 확인할 때 사용합니다. 예를 들어 남학생과 여학생의 자기통제력 평균이 다른지 검증할 수 있습니다.", paper: "예: 청소년 성별에 따른 자기통제력 또는 비행성향 평균 차이 비교 연구", graph: "bar" },
    "상관분석": { title: "상관분석", desc: "상관분석은 두 연속형 변수가 함께 증가하거나 감소하는 경향이 있는지 확인할 때 사용합니다. 단, 상관은 인과관계를 의미하지 않습니다.", paper: "예: 비행친구 수와 비행빈도의 관련성 연구", graph: "scatter" },
    "회귀분석": { title: "회귀분석", desc: "회귀분석은 하나 이상의 독립변수가 종속변수를 얼마나 예측하는지 검토할 때 사용합니다. 통제변수를 포함해 순수한 영향력을 살펴볼 수 있습니다.", paper: "예: 부모감독이 청소년 비행빈도에 미치는 영향 연구", graph: "line" },
    "로지스틱 회귀": { title: "로지스틱 회귀", desc: "로지스틱 회귀는 종속변수가 0/1처럼 이분형일 때 사용합니다. 결과는 odds 또는 odds ratio를 중심으로 해석합니다.", paper: "예: 후기비행 진입 여부를 예측하는 위험요인 연구", graph: "logit" },
    "t-test": { title: "t-test", desc: "A t-test examines whether two groups differ significantly in their means.", paper: "Example: Gender differences in self-control among adolescents.", graph: "bar" },
    "Correlation": { title: "Correlation", desc: "Correlation examines whether two continuous variables move together. It does not imply causation.", paper: "Example: Relationship between delinquent peers and delinquency frequency.", graph: "scatter" },
    "Regression": { title: "Regression", desc: "Regression examines how one or more independent variables predict a dependent variable.", paper: "Example: Parental supervision predicting delinquency frequency.", graph: "line" },
    "Logistic Regression": { title: "Logistic Regression", desc: "Logistic regression is used when the dependent variable is binary.", paper: "Example: Predicting entry into late-onset delinquency.", graph: "logit" },
  };

  return (
    <section className="paper-panel">
      <div className="panel-header"><div><div className="eyebrow">Statistics</div><h2>{lang === "ko" ? "기초 통계방법론" : "Basic Statistical Methods"}</h2></div></div>
      <div className="card-grid">
        {cards.map((card) => (
          <button type="button" className="info-card clickable-card" key={card.title} onClick={() => setSelectedStat(statDetails[card.title])}>
            <h3>{card.title}</h3><strong>{card.question}</strong><p>ex) {card.example}</p>
          </button>
        ))}
      </div>
      {selectedStat && (
        <Modal onClose={() => setSelectedStat(null)}>
          <article className="stat-detail"><div className="eyebrow">Method Detail</div><h2>{selectedStat.title}</h2><p>{selectedStat.desc}</p><StatGraph type={selectedStat.graph} /><h3>{lang === "ko" ? "활용 논문 예시" : "Example Research Use"}</h3><p>{selectedStat.paper}</p></article>
        </Modal>
      )}
    </section>
  );
}

function StatGraph({ type }) {
  return (
    <div className="stat-graph">
      {type === "bar" && <svg viewBox="0 0 320 180"><line x1="40" y1="145" x2="280" y2="145" /><line x1="40" y1="145" x2="40" y2="25" /><rect x="90" y="75" width="48" height="70" rx="6" /><rect x="185" y="48" width="48" height="97" rx="6" /><text x="114" y="165" textAnchor="middle">A</text><text x="209" y="165" textAnchor="middle">B</text></svg>}
      {type === "scatter" && <svg viewBox="0 0 320 180"><line x1="40" y1="145" x2="280" y2="145" /><line x1="40" y1="145" x2="40" y2="25" />{[70, 95, 120, 150, 175, 205, 230, 255].map((x, i) => <circle key={x} cx={x} cy={130 - i * 11} r="5" />)}<line x1="65" y1="128" x2="260" y2="42" className="trend-line" /></svg>}
      {type === "line" && <svg viewBox="0 0 320 180"><line x1="40" y1="145" x2="280" y2="145" /><line x1="40" y1="145" x2="40" y2="25" /><polyline points="55,130 95,112 135,100 175,78 215,65 260,42" /></svg>}
      {type === "logit" && <svg viewBox="0 0 320 180"><line x1="40" y1="145" x2="280" y2="145" /><line x1="40" y1="145" x2="40" y2="25" /><path d="M55 135 C110 135, 125 118, 155 90 C185 62, 210 42, 265 40" /></svg>}
    </div>
  );
}

function MethodsBook({ quiz, methodChoice, setMethodChoice, lang }) {
  const isCorrect = methodChoice === quiz.answer;
  return (
    <section className="paper-panel">
      <div className="panel-header"><div><div className="eyebrow">Research Methods</div><h2>{lang === "ko" ? "분석방법 선택 훈련" : "Choosing an Analysis Method"}</h2></div></div>
      <div className="method-question">
        <h3>{quiz.question}</h3>
        <div className="variable-list">{quiz.variables.map((variable) => <div key={variable}>{variable}</div>)}</div>
        <div className="option-grid">{quiz.options.map((option) => <button key={option} className={`option-button ${methodChoice === option ? "is-selected" : ""}`} onClick={() => setMethodChoice(option)}>{option}</button>)}</div>
        {methodChoice && !isCorrect && <div className="feedback-box incorrect"><h3>{lang === "ko" ? "다시 생각해보세요." : "Think again."}</h3><p>{lang === "ko" ? "종속변수의 형태와 연구질문을 다시 확인해보세요." : "Check the dependent variable type and the research question again."}</p></div>}
        {methodChoice && isCorrect && <div className="feedback-box correct"><h3>{lang === "ko" ? "적절한 선택입니다." : "Good choice."}</h3><p>{quiz.explanation}</p></div>}
      </div>
    </section>
  );
}

function Placeholder({ title, body }) {
  return <section className="paper-panel"><div className="eyebrow">Archive</div><h2>{title}</h2><p className="placeholder-text">{body}</p></section>;
}

function Modal({ children, onClose }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-paper" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}

export default App;
