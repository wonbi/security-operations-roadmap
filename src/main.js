const refs = [
  { name: 'NIST Cybersecurity Framework 2.0', org: 'NIST', url: 'https://www.nist.gov/cyberframework', tag: '프레임워크', desc: '보안 위험을 식별하고 우선순위를 정하는 공통 언어' },
  { name: 'KISA ISMS-P', org: 'KISA', url: 'https://isms.kisa.or.kr/', tag: '국내 기준', desc: '국내 정보보호·개인정보보호 관리체계 공식 자료' },
  { name: 'Microsoft Defender for Endpoint', org: 'Microsoft Learn', url: 'https://learn.microsoft.com/en-us/defender-endpoint/', tag: 'EDR', desc: '엔드포인트 온보딩, 탐지, 대응과 운영 가이드' },
  { name: 'OWASP Developer Guide', org: 'OWASP', url: 'https://owasp.org/www-project-developer-guide/', tag: '웹 보안', desc: '웹 애플리케이션 보안 원칙과 테스트 가이드' },
  { name: 'MITRE ATT&CK', org: 'MITRE', url: 'https://attack.mitre.org/', tag: '위협 분석', desc: '공격 전술·기술을 운영 탐지와 연결하는 지식베이스' },
  { name: 'IETF RFC Index', org: 'IETF', url: 'https://www.rfc-editor.org/', tag: '네트워크', desc: 'TCP/IP와 인터넷 프로토콜의 원문 표준' },
]

const sectorMeta = [
  { id: 'network', icon: '◎', color: 'cyan', title: '기초 네트워크', en: 'NETWORK FOUNDATION', desc: 'TCP/IP와 트래픽 흐름을 읽는 힘', outcome: '패킷 흐름과 장애 지점을 설명할 수 있다.' },
  { id: 'endpoint', icon: '◈', color: 'violet', title: '단말 보안', en: 'ENDPOINT SECURITY', desc: 'EDR·백신·DLP·NAC 운영', outcome: '단말 정책과 탐지 이벤트를 운영할 수 있다.' },
  { id: 'network-security', icon: '▣', color: 'amber', title: '네트워크 보안', en: 'NETWORK SECURITY', desc: 'Firewall·IPS·VPN·WAF 운영', outcome: '접근제어 정책과 보안 장비 장애를 분석할 수 있다.' },
  { id: 'policy', icon: '≡', color: 'green', title: '정책 운영', en: 'POLICY OPERATIONS', desc: '배포·예외·변경·롤백 프로세스', outcome: '변경 근거와 영향도를 기록하고 통제할 수 있다.' },
  { id: 'incident', icon: '△', color: 'red', title: '로그·장애 대응', en: 'INCIDENT RESPONSE', desc: '로그 분석과 원인 규명', outcome: '장애를 재현·분리·조치하고 재발을 방지할 수 있다.' },
  { id: 'customer', icon: '⊙', color: 'blue', title: 'B2B 고객 운영', en: 'CUSTOMER OPERATIONS', desc: 'SLA·기술 협의·정기 보고', outcome: '기술 내용을 고객 언어와 보고서로 전환할 수 있다.' },
  { id: 'automation', icon: '⌁', color: 'pink', title: '운영 자동화', en: 'AUTOMATION', desc: '반복 업무를 안전하게 줄이기', outcome: '검증 가능한 스크립트와 운영 자동화를 설계할 수 있다.' },
  { id: 'career', icon: '↗', color: 'white', title: '취업 대비', en: 'CAREER READINESS', desc: '경력기술서·면접·자격증', outcome: '운영 경험을 증거와 성과 중심으로 설명할 수 있다.' },
]

const topicSeeds = {
  network: [
    ['TCP/IP 4계층', 'TCP/IP model', '기초', '계층별 역할과 캡슐화를 이해하고 장애 범위를 좁힌다.', '클라이언트 요청이 애플리케이션에서 NIC까지 내려가는 과정을 4계층으로 설명한다.', 'OSI 7계층과 TCP/IP 4계층을 대응시키고, 각 계층의 대표 로그를 적어본다.'],
    ['DNS와 HTTP 흐름', 'DNS / HTTP', '기초', '이름 해석부터 TLS, HTTP 응답까지의 정상 흐름을 기준선으로 만든다.', 'DNS는 성공하지만 HTTPS만 실패하는 상황에서 확인 순서를 설계한다.', 'nslookup/dig, curl, 브라우저 개발자 도구에서 확인할 지점을 정리한다.'],
    ['라우팅과 방화벽 기초', 'Routing / Firewall', '기초', '경로, 포트, 상태 추적을 분리해 네트워크 장애를 분석한다.', '특정 대역에서만 서버 443 포트가 타임아웃되는 장애를 분석한다.', '출발지·목적지·포트·경로·정책 순으로 확인하는 5단계 템플릿을 작성한다.'],
    ['패킷·로그 읽기', 'Packet & Log Reading', '실무', '패킷과 장비 로그에서 사실과 추정을 구분한다.', 'SYN 재전송이 반복되는 캡처를 보고 네트워크·서버·정책 후보를 분리한다.', '타임스탬프, 5-tuple, 상태코드, 상관관계 ID를 추출한다.'],
  ],
  endpoint: [
    ['EDR 운영 모델', 'EDR Operations', '기초', '수집·탐지·분석·격리·복구의 운영 생명주기를 이해한다.', '의심스러운 PowerShell 실행 이벤트가 들어온 뒤 초기 대응을 수행한다.', '탐지 심각도, 호스트 중요도, 사용자 영향으로 우선순위를 정한다.'],
    ['백신 정책과 예외', 'AV Policy', '기초', '실시간 보호, 검사 주기, 예외의 위험을 정책으로 관리한다.', '업무 프로그램이 오탐되는 상황에서 무조건 예외를 주지 않고 검증한다.', '예외 대상·기간·승인자·대체 통제를 기록한다.'],
    ['DLP 데이터 흐름', 'DLP', '실무', '데이터 분류와 채널 통제를 연결해 유출 위험을 줄인다.', 'USB로 대량 파일이 복사된 경보의 사실관계를 확인한다.', '데이터 유형, 사용자, 채널, 행위, 업무 필요성을 기준으로 판단한다.'],
    ['NAC 접근제어', 'NAC', '실무', '단말 식별·상태평가·격리·복귀 흐름을 운영한다.', '보안 에이전트가 중지된 단말이 격리망으로 이동한 상황을 조치한다.', '인증 실패와 정책 불일치를 구분하고 복귀 조건을 기록한다.'],
  ],
  'network-security': [
    ['Firewall 정책 설계', 'Firewall Rule Design', '기초', '최소권한과 명확한 객체·서비스·방향으로 정책을 설계한다.', '신규 B2B 고객의 HTTPS 연동 요청을 정책으로 변환한다.', '정책 목적, 출발지, 목적지, 서비스, 기간, 로그 여부를 정의한다.'],
    ['IPS 탐지와 예외', 'IPS Detection', '실무', '탐지 시그니처와 실제 공격 가능성을 분리해 예외를 통제한다.', '정상 API 호출이 공격 시그니처로 탐지된 이벤트를 검증한다.', '시그니처·원본 페이로드·반복성·대체 방어를 확인한다.'],
    ['VPN 인증·터널', 'VPN', '실무', '인증, 암호화, 터널, 라우팅을 분리해 접속 장애를 분석한다.', '인증은 성공하지만 내부 시스템에 접속되지 않는 장애를 분석한다.', '사용자 인증→터널→주소 할당→라우팅→목적지 정책 순으로 확인한다.'],
    ['WAF 요청 분석', 'WAF', '실무', '웹 요청·응답과 WAF 정책의 관계를 분석한다.', '특정 파라미터가 차단되어 403이 발생하는 이슈를 재현·완화한다.', 'URI, 메서드, 파라미터, 룰 ID, 원본 서버 응답을 비교한다.'],
  ],
  policy: [
    ['정책 배포 절차', 'Policy Deployment', '기초', '요청-검토-승인-테스트-배포-검증의 흐름을 표준화한다.', '긴급 차단 정책을 배포하면서 서비스 영향과 롤백을 함께 준비한다.', '변경 티켓, 사전 검증, 승인, 배포 시각, 사후 검증을 남긴다.'],
    ['예외 승인 관리', 'Exception Management', '실무', '예외는 영구 허용이 아니라 만료와 보완 통제를 가진 위험 수용이다.', '업무상 필요한 예외 요청의 위험도를 평가한다.', '사유·범위·만료일·승인자·대체 통제·재검토일을 기록한다.'],
    ['변경·롤백', 'Change & Rollback', '실무', '변경 전후 상태와 실패 시 복구 경로를 관리한다.', '정책 변경 후 일부 고객의 연결이 끊겨 즉시 롤백한다.', '변경 단위, 백업, 성공 기준, 관찰 시간, 롤백 트리거를 정의한다.'],
    ['SOP와 증적', 'SOP & Evidence', '실무', '반복 가능한 운영절차와 감사 가능한 증적을 만든다.', '감사 요청에 정책 이력과 승인 기록을 빠르게 제출한다.', '문서 버전, 소유자, 승인일, 점검 주기, 관련 티켓을 연결한다.'],
  ],
  incident: [
    ['로그 수집과 기준선', 'Logging Baseline', '기초', '정상 상태와 시간 동기화를 기준으로 이상을 찾는다.', '장비별 시간이 달라 사건 순서가 뒤섞인 로그를 정렬한다.', 'NTP, 소스, 필드, 보존기간, 수집 누락을 점검한다.'],
    ['장애 트리아지', 'Incident Triage', '실무', '영향도와 긴급도로 사건을 분류하고 대응자를 정한다.', '다수 고객의 접속 장애가 발생한 상황에서 우선순위를 정한다.', '영향 범위·확산성·보안성·복구 난이도로 우선순위를 점수화한다.'],
    ['원인 분석 RCA', 'Root Cause Analysis', '실무', '증상·직접 원인·기여 요인·근본 원인을 분리한다.', '정책 배포 이후 탐지량이 급증한 사건의 RCA를 작성한다.', '타임라인, 증거, 가설, 검증 결과, 재발 방지책을 기록한다.'],
    ['사고 후 개선', 'Post-Incident Review', '실무', '복구가 끝난 뒤 탐지·절차·문서·자동화를 개선한다.', '반복 장애의 액션 아이템을 담당자와 기한까지 확정한다.', '무엇이 잘못됐는지보다 어떤 통제를 개선할지 측정 가능하게 쓴다.'],
  ],
  customer: [
    ['B2B 이슈 접수', 'B2B Intake', '기초', '고객 표현을 기술 사실과 업무 영향으로 번역한다.', '고객이 “보안 솔루션이 전부 멈췄다”고 문의한 상황을 정리한다.', '고객·시각·영향·재현·최근 변경·증거를 한 장으로 정리한다.'],
    ['SLA와 우선순위', 'SLA & Priority', '실무', '기술 심각도와 고객 서비스 중요도를 함께 판단한다.', '긴급 장애와 단일 사용자 문의가 동시에 들어온 상황을 배분한다.', '응답 목표, 복구 목표, 중간 공지 주기, 에스컬레이션 조건을 확인한다.'],
    ['기술 협의 진행', 'Technical Workshop', '실무', '가정·제약·결정사항을 명시해 협의를 실행계획으로 바꾼다.', '고객의 방화벽 변경 요청을 보안·운영 조건과 함께 검토한다.', '아젠다, 결정권자, 액션, 기한, 미결 이슈를 회의록에 남긴다.'],
    ['정기 운영 보고', 'Service Reporting', '실무', '운영량보다 위험·추세·조치 중심으로 보고한다.', '월간 보고서에서 탐지 증가를 장애가 아닌 개선 지표로 설명한다.', 'KPI, 주요 사건, 정책 변경, 미해결 위험, 다음 달 계획을 제시한다.'],
  ],
  automation: [
    ['운영 자동화 원칙', 'Automation Guardrails', '기초', '자동화 범위·승인·검증·중단 장치를 먼저 설계한다.', '대량 정책 변경 스크립트의 오작동 위험을 줄인다.', 'dry-run, 입력 검증, 권한 최소화, 감사 로그, 롤백을 포함한다.'],
    ['로그 검색 쿼리', 'Log Querying', '실무', '필터·집계·상관관계로 반복 분석 시간을 줄인다.', '특정 호스트의 로그인 실패와 EDR 탐지를 시간순으로 묶는다.', '시간창, 키 필드, 중복 제거, 결과 보존, 오탐 검증을 적용한다.'],
    ['정책 검증 스크립트', 'Policy Validation', '실무', '변경 전후 정책의 누락·중복·과도한 허용을 자동 점검한다.', 'any-any 규칙과 만료된 예외를 사전 탐지한다.', '정책 ID, 소유자, 만료일, 영향 서비스, 승인 티켓을 검사한다.'],
    ['운영 자동화 포트폴리오', 'Automation Portfolio', '실무', '효과와 위험을 비교해 자동화 우선순위를 정한다.', '수작업 보고서 생성을 자동화할지 판단한다.', '빈도·절감시간·오류위험·복구가능성·데이터 민감도를 평가한다.'],
  ],
  career: [
    ['경력기술서 구조', 'Experience Story', '취업', '상황-행동-결과로 운영 경험을 증거화한다.', 'EDR 운영 경험을 제품 나열이 아닌 성과로 바꿔 쓴다.', '대상·문제·내 역할·조치·수치·재발 방지까지 한 사례로 정리한다.'],
    ['기술면접 대비', 'Technical Interview', '취업', '정답보다 판단 순서와 운영 trade-off를 설명한다.', 'VPN 접속 장애 질문에 확인 순서와 고객 커뮤니케이션을 함께 답한다.', '가설→확인→조치→검증→보고의 구조로 답변을 연습한다.'],
    ['자격증 로드맵', 'Certification Path', '취업', '정보보안기사·ISMS-P·CISSP의 목적과 시기를 구분한다.', '현재 경력과 학습 시간에 맞는 우선순위를 정한다.', '응시요건, 출제범위, 실무 연결성, 준비 기간을 비교한다.'],
    ['12주 포트폴리오', '12-week Portfolio', '취업', '학습 기록을 운영 플레이북과 면접 포트폴리오로 묶는다.', '12주 후 실제로 보여줄 산출물을 계획한다.', '네트워크 진단서, 정책변경서, RCA, 월간보고서, 자동화 예제를 완성한다.'],
  ],
}

const topics = Object.entries(topicSeeds).flatMap(([sector, items]) => items.map((item, index) => ({
  id: `${sector}-${index + 1}`, sector, title: item[0], en: item[1], level: item[2], summary: item[3], scenario: item[4], practice: item[5],
  terms: item[1].split(' / '),
  checks: ['핵심 개념을 내 말로 설명하기', '운영 절차를 순서대로 적기', '실무 시나리오의 확인 항목 만들기', '면접 답변 또는 운영 산출물 남기기'],
  questions: [`${item[0]}을 운영할 때 가장 먼저 확인할 것은 무엇인가?`, '정상 기준선과 예외 상황을 어떻게 구분할 것인가?', '변경 또는 조치 이후 성공 여부를 어떻게 검증할 것인가?'],
  refs: sector === 'network' ? [refs[5], refs[0]] : sector === 'endpoint' ? [refs[2], refs[4]] : sector === 'career' ? [refs[0], refs[1]] : [refs[0], refs[1]],
})))

const state = {
  page: 'dashboard', search: '', filter: '전체', selectedTopic: null,
  completed: JSON.parse(localStorage.getItem('secops-completed') || '{}'),
  notes: JSON.parse(localStorage.getItem('secops-notes') || '{}'),
}

const save = () => { localStorage.setItem('secops-completed', JSON.stringify(state.completed)); localStorage.setItem('secops-notes', JSON.stringify(state.notes)) }
const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))
const sector = (id) => sectorMeta.find((item) => item.id === id)
const doneCount = () => Object.values(state.completed).filter(Boolean).length
const pct = (n, total = topics.length) => Math.round((n / total) * 100)

function icon(name) {
  const icons = { dashboard: '⌂', learn: '◫', roadmap: '↗', matrix: '⊞', refs: '◌' }
  return icons[name] || '•'
}

function appShell(content) {
  return `<div class="app-shell"><aside class="sidebar"><div class="brand"><div class="brand-mark">S</div><div><strong>SECOPS</strong><span>FIELD GUIDE / 01</span></div></div><div class="side-label">NAVIGATION</div><nav>${[['dashboard','대시보드','Overview'],['learn','학습 섹터','Learning sectors'],['roadmap','12주 로드맵','Study plan'],['matrix','역량 매트릭스','Job mapping'],['refs','레퍼런스','Official sources']].map(([id,kr,en]) => `<button class="nav-item ${state.page === id ? 'active' : ''}" data-page="${id}"><span class="nav-icon">${icon(id)}</span><span><b>${kr}</b><small>${en}</small></span></button>`).join('')}</nav><div class="sidebar-bottom"><div class="mini-progress"><div class="side-label">YOUR PROGRESS</div><div class="progress-number">${pct(doneCount())}<small>%</small></div><div class="progress-track"><i style="width:${pct(doneCount())}%"></i></div><p>${doneCount()} / ${topics.length} topics completed</p></div><div class="status-pill"><i></i> LOCAL MODE <span>●</span></div></div></aside><main class="main"><header class="topbar"><div class="breadcrumb">SECOPS FIELD GUIDE <span>/</span> ${state.page.toUpperCase()}</div><button class="reset-btn" id="reset-progress">진도 초기화</button></header>${content}</main></div>`
}

function dashboard() {
  const next = topics.find((t) => !state.completed[t.id]) || topics[0]
  const weak = sectorMeta.map((s) => ({ ...s, count: topics.filter((t) => t.sector === s.id).filter((t) => state.completed[t.id]).length })).sort((a,b) => a.count / 4 - b.count / 4)[0]
  return appShell(`<section class="page fade-in"><div class="hero"><div><div class="eyebrow"><i></i> OPERATIONS READINESS PROGRAM / 2026</div><h1>보안 운영,<br><em>다시 현장으로.</em></h1><p>5년의 공백을 실무 역량으로 연결하는<br>정보보안 솔루션 운영 학습 플레이북입니다.</p><button class="primary-btn" data-topic="${next.id}">다음 학습 시작 <span>→</span></button></div><div class="hero-orbit"><div class="orbit-ring ring-1"></div><div class="orbit-ring ring-2"></div><div class="orbit-ring ring-3"></div><div class="orbit-core"><span>OPS</span><b>${String(pct(doneCount())).padStart(2,'0')}</b><small>% READY</small></div><div class="orbit-dot dot-a"></div><div class="orbit-dot dot-b"></div><div class="orbit-dot dot-c"></div></div></div><div class="section-heading"><div><span class="eyebrow">COMMAND CENTER</span><h2>현재 학습 상태</h2></div><span class="live-tag"><i></i> LOCAL STORAGE ACTIVE</span></div><div class="stats-grid"><div class="stat-card accent"><span class="stat-label">TOTAL PROGRESS</span><strong>${pct(doneCount())}<small>%</small></strong><div class="progress-track"><i style="width:${pct(doneCount())}%"></i></div><p>${doneCount()}개 학습 주제 완료</p></div><div class="stat-card"><span class="stat-label">CURRENT PHASE</span><strong class="phase">${doneCount() < 8 ? '01' : doneCount() < 20 ? '02' : '03'} <small>/ 03</small></strong><p>${doneCount() < 8 ? '기초 기반 세우기' : doneCount() < 20 ? '운영 시나리오 훈련' : '취업 실전 준비'}</p></div><div class="stat-card"><span class="stat-label">WEAK SIGNAL</span><strong class="signal">${weak.title}</strong><p>${4 - weak.count}개 주제 남음 · 우선 학습 권장</p></div><div class="stat-card"><span class="stat-label">NEXT MILESTONE</span><strong class="milestone">12주</strong><p>운영 포트폴리오 완성 목표</p></div></div><div class="dashboard-grid"><div class="panel sector-panel"><div class="panel-head"><div><span class="eyebrow">SECTOR SCAN</span><h3>역량별 진행 현황</h3></div><button class="text-btn" data-page="learn">전체 보기 →</button></div><div class="sector-list">${sectorMeta.map((s) => { const done = topics.filter((t) => t.sector === s.id && state.completed[t.id]).length; return `<button class="sector-row" data-sector="${s.id}"><span class="sector-icon ${s.color}">${s.icon}</span><span class="sector-info"><b>${s.title}</b><small>${s.en}</small></span><span class="sector-bar"><i style="width:${pct(done,4)}%"></i></span><strong>${String(pct(done,4)).padStart(2,'0')}<small>%</small></strong><span class="row-arrow">↗</span></button>` }).join('')}</div></div><div class="panel focus-panel"><span class="eyebrow">RECOMMENDED NEXT</span><h3>${esc(next.title)}</h3><span class="topic-sector ${sector(next.sector).color}">${sector(next.sector).title} / ${next.level}</span><p>${esc(next.summary)}</p><div class="focus-bottom"><span>예상 35분</span><button class="circle-btn" data-topic="${next.id}">→</button></div></div></div></section>`)
}

function learnPage() {
  const filtered = topics.filter((t) => { const q = state.search.toLowerCase(); return (!q || `${t.title} ${t.en} ${t.summary}`.toLowerCase().includes(q)) && (state.filter === '전체' || t.sector === state.filter || t.level === state.filter) })
  return appShell(`<section class="page fade-in"><div class="page-title"><div><span class="eyebrow">KNOWLEDGE BASE / 08 SECTORS</span><h1>학습 섹터</h1><p>기초 개념에서 운영 문서와 면접 답변까지, 한 주제를 끝까지 연결합니다.</p></div><div class="title-count"><strong>${filtered.length}</strong><span>VISIBLE TOPICS</span></div></div><div class="toolbar"><div class="search-box"><span>⌕</span><input id="search" value="${esc(state.search)}" placeholder="주제, 용어, 운영 키워드 검색" /></div><div class="filter-wrap"><button class="filter-btn ${state.filter === '전체' ? 'selected' : ''}" data-filter="전체">전체</button>${sectorMeta.map((s) => `<button class="filter-btn ${state.filter === s.id ? 'selected' : ''}" data-filter="${s.id}">${s.title}</button>`).join('')}<button class="filter-btn ${state.filter === '실무' ? 'selected' : ''}" data-filter="실무">실무</button><button class="filter-btn ${state.filter === '취업' ? 'selected' : ''}" data-filter="취업">취업</button></div></div><div class="topic-grid">${filtered.map(topicCard).join('')}</div></section>`)
}

function topicCard(t) { const s = sector(t.sector); const complete = state.completed[t.id]; return `<article class="topic-card ${complete ? 'complete' : ''}" data-topic="${t.id}"><div class="card-top"><span class="sector-icon ${s.color}">${s.icon}</span><span class="topic-level">${t.level}</span><button class="check-btn ${complete ? 'checked' : ''}" data-complete="${t.id}">${complete ? '✓' : '○'}</button></div><span class="card-kicker">${s.en}</span><h3>${esc(t.title)}</h3><p>${esc(t.summary)}</p><div class="card-foot"><span>${t.terms.join(' · ')}</span><b>열기 ↗</b></div></article>` }

function roadmap() { const weeks = [['01–02','기초 기반','네트워크·로그·보안 운영의 공통 언어를 회복합니다.',['TCP/IP 4계층','DNS와 HTTP 흐름','로그 수집과 기준선','정책 배포 절차']],['03–05','솔루션 운영','단말과 네트워크 보안 장비의 운영 흐름을 익힙니다.',['EDR 운영 모델','백신 정책과 예외','Firewall 정책 설계','VPN 인증·터널','WAF 요청 분석']],['06–08','장애·고객 대응','트리아지, RCA, SLA와 기술 협의를 훈련합니다.',['장애 트리아지','원인 분석 RCA','B2B 이슈 접수','SLA와 우선순위','정기 운영 보고']],['09–10','자동화·문서화','정책 검증과 반복 업무 자동화 산출물을 만듭니다.',['운영 자동화 원칙','로그 검색 쿼리','정책 검증 스크립트','SOP와 증적']],['11–12','취업 실전','경험을 경력기술서와 기술면접 답변으로 전환합니다.',['경력기술서 구조','기술면접 대비','자격증 로드맵','12주 포트폴리오']]]; return appShell(`<section class="page fade-in"><div class="page-title"><div><span class="eyebrow">FIELD TRAINING / 12 WEEKS</span><h1>12주 로드맵</h1><p>매주 하나의 운영 산출물을 남기며 공백기를 실무 언어로 바꿉니다.</p></div></div><div class="roadmap">${weeks.map((w,i) => `<div class="roadmap-row"><div class="week-marker"><span>PHASE ${String(i+1).padStart(2,'0')}</span><strong>${w[0]}</strong></div><div class="roadmap-content"><div><span class="eyebrow">${w[1]}</span><h2>${w[2]}</h2></div><div class="roadmap-topics">${w[3].map((name) => {const t=topics.find(x=>x.title===name); return t ? `<button data-topic="${t.id}" class="roadmap-topic ${state.completed[t.id]?'done':''}"><i>${state.completed[t.id]?'✓':'○'}</i>${name}<span>→</span></button>` : ''}).join('')}</div></div></div>`).join('')}</div></section>`) }

function matrix() { const rows = [['EDR·백신·DLP·NAC','endpoint','탐지·정책·예외·격리 운영'],['정책 배포·예외·변경관리','policy','승인·테스트·롤백·증적'],['Firewall·IPS·VPN·WAF','network-security','접근제어·탐지·터널·웹 요청'],['장애 분석·트러블슈팅','incident','로그·트리아지·RCA·재발방지'],['B2B 운영 지원·기술 협의','customer','SLA·회의록·에스컬레이션'],['정기 보고·문서화','customer','KPI·위험·조치·다음 계획'],['운영 자동화','automation','쿼리·검증·스크립트·가드레일']]; return appShell(`<section class="page fade-in"><div class="page-title"><div><span class="eyebrow">JOB DESCRIPTION / MAPPING</span><h1>역량 매트릭스</h1><p>채용공고의 요구사항을 실제 학습 주제와 운영 증거에 매핑했습니다.</p></div></div><div class="panel matrix-panel"><div class="matrix-header"><span>채용 요구사항</span><span>학습 섹터</span><span>준비할 증거</span><span>상태</span></div>${rows.map(([req,sec,evidence])=>{const s=sector(sec);const related=topics.filter(t=>t.sector===sec);const done=related.filter(t=>state.completed[t.id]).length; return `<div class="matrix-row"><strong>${req}</strong><span class="matrix-sector"><i class="sector-icon ${s.color}">${s.icon}</i>${s.title}</span><span>${evidence}</span><span class="matrix-status ${done===related.length?'ready':''}">${done===related.length?'READY':`${done}/${related.length}`}</span></div>`}).join('')}</div><div class="callout"><span>◎</span><div><b>면접에서 보여줄 운영 증거</b><p>정책 변경서, 장애 RCA, 월간 운영 보고서, 로그 분석 쿼리, 예외 승인 기록을 포트폴리오 형태로 축적하세요.</p></div></div></section>`) }

function references() { return appShell(`<section class="page fade-in"><div class="page-title"><div><span class="eyebrow">PRIMARY SOURCES / VERIFIED LINKS</span><h1>레퍼런스</h1><p>학습 내용은 공식 원문을 기준으로 요약하고, 최신 변경은 원문에서 확인합니다.</p></div></div><div class="ref-grid">${refs.map((r,i)=>`<a class="ref-card" href="${r.url}" target="_blank" rel="noreferrer"><div class="ref-index">0${i+1}</div><span class="ref-tag">${r.tag}</span><h3>${r.name}</h3><p>${r.desc}</p><div class="ref-foot"><span>${r.org}</span><b>공식 문서 열기 ↗</b></div></a>`).join('')}</div></section>`) }

function render() { const content = state.page === 'dashboard' ? dashboard() : state.page === 'learn' ? learnPage() : state.page === 'roadmap' ? roadmap() : state.page === 'matrix' ? matrix() : references(); document.querySelector('#app').innerHTML = content; bind(); }

function openTopic(id) { const t = topics.find((x) => x.id === id); if (!t) return; state.selectedTopic = id; const s=sector(t.sector); const note=state.notes[id] || ''; document.body.insertAdjacentHTML('beforeend', `<div class="modal-backdrop" id="topic-modal"><div class="topic-modal"><button class="modal-close" id="close-modal">×</button><div class="modal-kicker"><span class="sector-icon ${s.color}">${s.icon}</span><span>${s.title} / ${t.level}</span></div><h2>${t.title}</h2><p class="modal-summary">${t.summary}</p><div class="modal-columns"><div><div class="modal-block"><span class="eyebrow">FIELD NOTE</span><p>${t.practice}</p></div><div class="modal-block"><span class="eyebrow">SCENARIO</span><p>${t.scenario}</p></div><div class="modal-block"><span class="eyebrow">CHECKLIST</span>${t.checks.map((c,i)=>`<label class="modal-check"><input type="checkbox" ${state.completed[`${id}-check-${i}`]?'checked':''} data-check="${id}-check-${i}"><span>${c}</span></label>`).join('')}</div></div><div><div class="modal-block"><span class="eyebrow">INTERVIEW PROMPTS</span>${t.questions.map((q)=>`<p class="question">? ${q}</p>`).join('')}</div><div class="modal-block"><span class="eyebrow">MY NOTES</span><textarea id="topic-note" placeholder="운영 사례, 명령어, 면접 답변을 기록하세요...">${esc(note)}</textarea><button class="save-note" id="save-note">메모 저장</button></div><div class="modal-block"><span class="eyebrow">OFFICIAL SOURCES</span>${t.refs.map(r=>`<a class="inline-ref" href="${r.url}" target="_blank" rel="noreferrer">${r.name} ↗</a>`).join('')}</div></div></div><button class="complete-topic ${state.completed[id]?'completed':''}" id="complete-topic">${state.completed[id]?'✓ 학습 완료됨':'이 주제 학습 완료 처리'} <span>→</span></button></div></div>`); document.querySelectorAll('[data-check]').forEach((el)=>el.addEventListener('change',(e)=>{state.completed[e.target.dataset.check]=e.target.checked;save()})); document.querySelector('#close-modal').onclick=()=>document.querySelector('#topic-modal').remove(); document.querySelector('#topic-modal').onclick=(e)=>{if(e.target.id==='topic-modal')e.currentTarget.remove()}; document.querySelector('#save-note').onclick=()=>{state.notes[id]=document.querySelector('#topic-note').value;save();document.querySelector('#save-note').textContent='저장 완료 ✓';}; document.querySelector('#complete-topic').onclick=()=>{state.completed[id]=!state.completed[id];save();document.querySelector('#topic-modal').remove();render();openTopic(id)} }

function bind() { document.querySelectorAll('[data-page]').forEach((el)=>el.addEventListener('click',()=>{state.page=el.dataset.page;render()})); document.querySelectorAll('[data-topic]').forEach((el)=>el.addEventListener('click',()=>openTopic(el.dataset.topic))); document.querySelectorAll('[data-sector]').forEach((el)=>el.addEventListener('click',()=>{state.page='learn';state.filter=el.dataset.sector;render()})); document.querySelectorAll('[data-filter]').forEach((el)=>el.addEventListener('click',()=>{state.filter=el.dataset.filter;render()})); document.querySelectorAll('[data-complete]').forEach((el)=>el.addEventListener('click',(e)=>{e.stopPropagation();state.completed[el.dataset.complete]=!state.completed[el.dataset.complete];save();render()})); const search=document.querySelector('#search'); if(search){search.addEventListener('input',(e)=>{state.search=e.target.value;const pos=e.target.selectionStart;render();const next=document.querySelector('#search');next.focus();next.setSelectionRange(pos,pos)})} const reset=document.querySelector('#reset-progress'); if(reset) reset.onclick=()=>{if(confirm('모든 학습 진도와 체크리스트를 초기화할까요?')){state.completed={};state.notes={};save();render()}} }

render()
