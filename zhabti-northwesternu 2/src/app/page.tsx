"use client";

import { useMemo, useState } from "react";

type OptionKey = "A" | "B" | "C";

type Question = {
  id: number;
  text: string;
  options: { key: OptionKey; text: string }[];
};

type Result = {
  title: string;
  tag: string;
  analysis: string;
};

const questions: Question[] = [
  {
    id: 1,
    text: "谈恋爱谈了半年后，你发现不是很喜欢对方了，你倾向于",
    options: [
      { key: "A", text: "果断分手" },
      { key: "B", text: "再硬撑一段时间再分手" },
      { key: "C", text: "再撑很长时间尝试重新喜欢起来" }
    ]
  },
  {
    id: 2,
    text: "当你面对别人对你的负面评价时，你倾向于",
    options: [
      { key: "A", text: "比较重视别人的看法，反思自己" },
      { key: "B", text: "管他三七二十一的，做好自己" },
      { key: "C", text: "找他理论" }
    ]
  },
  {
    id: 3,
    text: "当你准备一场很难的面试很累的时候，你倾向于",
    options: [
      { key: "A", text: "按照计划干完所有复习任务再休息" },
      { key: "B", text: "先休息再干完计划中的所有任务" },
      { key: "C", text: "放弃今日计划，先睡一觉，明天再说" }
    ]
  },
  {
    id: 4,
    text: "不谈现在你的专业是什么，如果现在让你重新选择专业，你倾向于",
    options: [
      { key: "A", text: "选自己喜欢的，无论是不是在时代风口的专业" },
      { key: "B", text: "选在时代风口的专业，无论自己喜不喜欢" },
      { key: "C", text: "无所谓，分够哪个报哪个，报上就去" }
    ]
  },
  {
    id: 5,
    text: "如果你的朋友让你帮他一个大忙时（例如需要托人办事儿、解决户口、帮忙找工作等），你倾向于",
    options: [
      {
        key: "A",
        text: "看这个朋友过去跟自己的关系，以及这个人是否在过去是否对我友好，再决定是否帮忙"
      },
      {
        key: "B",
        text: "无论什么样的朋友，只要看着顺眼，能帮尽量帮一下，万一我以后有求与他呢？"
      },
      { key: "C", text: "很麻烦，能找借口就找借口推拖，能敷衍了事就敷衍了事" }
    ]
  },
  {
    id: 6,
    text: "当初次见面的朋友当着你面夸你时，你倾向于",
    options: [
      { key: "A", text: "抑制不住想笑，开心的不行" },
      { key: "B", text: "心想有没有可能只是寒暄？" },
      { key: "C", text: "没什么波澜，礼貌表达谢谢" }
    ]
  },
  {
    id: 7,
    text: "当你发现自己肉眼可见长胖了的时候，你倾向于",
    options: [
      { key: "A", text: "想快速方法让自己变瘦，例如打减肥针" },
      { key: "B", text: "制定科学计划，科学健身、健康饮食" },
      { key: "C", text: "顺其自然，当个开心的胖子也挺好的" }
    ]
  },
  {
    id: 8,
    text: "当你遇到了一个非常棒且自己等待了非常久的机会，但这个机会竞争极其激烈甚至达到了自己99%会失败的激烈程度，你倾向于",
    options: [
      { key: "A", text: "果断放弃，寻找其他高性价比或着相似机会" },
      { key: "B", text: "哪怕费再大的力气都要去尝试一下，绝对不留一丝遗憾" },
      { key: "C", text: "会争取这个机会，同时不放弃寻找其他机会" }
    ]
  },
  {
    id: 9,
    text: "世界上好人总比坏人多，善人总比恶人多，你倾向于",
    options: [
      { key: "A", text: "赞同" },
      { key: "B", text: "不赞同" },
      { key: "C", text: "不关心" }
    ]
  },
  {
    id: 10,
    text: "你倾向于：",
    options: [
      { key: "A", text: "以文字记录的方式概括世界" },
      { key: "B", text: "以数字、符号、公式的方式概括世界" },
      { key: "C", text: "以鬼画符的方式概括世界（以任意自己擅长但别人或许看不懂的方式概括世界）" }
    ]
  }
];

const resultMap: Record<string, Result> = {
  "A-000": {
    title: "会精打细算的会计师",
    tag: "务实、克制、会衡量得失",
    analysis: "你的整体作答偏谨慎务实，先看成本，再看值不值得投入。你处理关系和机会时不太容易被一时情绪带走，更像在做一张心里的收支表。这个结果适合那种稳住局面、把复杂事情拆开核算的人。"
  },
  "A-001": {
    title: "握笔如刀的作家",
    tag: "有判断、有表达、对世界有自己的解读",
    analysis: "你的答案里既有分寸感，也有鲜明的主观看法。你未必时时高调，但一旦形成判断，就很能把自己的感受和观点组织出来。这个人格像是观察世界后再精准下笔的人。"
  },
  "A-010": {
    title: "与世无争的清洁工",
    tag: "低调、守边界、尽量不卷入麻烦",
    analysis: "你不太喜欢把自己推到冲突中心，更重视日子过得安稳清爽。很多事情你会先想值不值得掺和，而不是为了面子或激情立刻冲上去。这个结果对应一种不争不抢、但把自己生活整理得很干净的气质。"
  },
  "A-011": {
    title: "纽约街头流浪汉",
    tag: "反叛、自由、按自己路子活",
    analysis: "这个结果是偏戏谑风格的。你的答案里有一种不太愿意被规则框住的自由感，既不迷信主流秩序，也不总想融入标准答案。你更像是愿意在边缘地带观察世界、坚持个人节奏的人。"
  },
  "A-100": {
    title: "毅力十足的马拉松运动员",
    tag: "能扛、能忍、长期主义",
    analysis: "你在压力和竞争面前并不轻易退场，反而更像能把事情拉到长周期来做的人。你不一定是最张扬的，但通常很能熬，也知道如何把节奏维持住。这个结果对应的是靠耐力而不是一时冲劲取胜的类型。"
  },
  "A-101": {
    title: "福尔摩斯般的侦探",
    tag: "细节敏感、判断冷静、擅长抽丝剥茧",
    analysis: "你的答案里既有秩序感，也有对人和情境的观察欲。你不太满足于表面说法，遇到事更想搞清楚背后的动机和线索。这个结果像是那种在混乱里找规律、在细节里抓真相的人。"
  },
  "A-110": {
    title: "坚守岗位的消防员",
    tag: "可靠、执行强、关键时刻顶得住",
    analysis: "你更像那种到了关键节点能稳住的人。对人对事都有现实判断，不会轻易逃避责任，也不太会被一时的情绪带偏。这个结果对应的是一种把该做的事扛起来、遇事不掉链子的气质。"
  },
  "A-111": {
    title: "美国间谍",
    tag: "目标明确、情绪收束、擅长双线思考",
    analysis: "这个结果同样带一点玩梗色彩。你的答案显示出较强的策略性：既会判断人，也会衡量局势，还不容易把真实想法全摊在台面上。你更像是先看牌局再行动的人。"
  },
  "B-000": {
    title: "勤奋敲代码的程序员",
    tag: "讲逻辑、重效率、偏工具理性",
    analysis: "你的作答整体偏中间路线，但底层逻辑很清晰：问题来了就拆、任务来了就做。你不一定追求戏剧化的表达，更在意方法是否有效、路径是否可复用。这个结果适合那种安静把系统搭起来的人。"
  },
  "B-001": {
    title: "有钻研精神的研究员",
    tag: "理性、耐心、喜欢深挖",
    analysis: "你不是冲得最快的类型，但很会在模糊里慢慢逼近答案。遇到复杂问题时，你更愿意理解结构、验证逻辑、反复推敲。这个结果对应对知识和真相有持续兴趣的人。"
  },
  "B-010": {
    title: "认真学习的书呆子",
    tag: "规矩、认真、愿意按标准做事",
    analysis: "你的答案透露出一种对秩序和正确性的信任。你做事通常不靠花活，而是靠老老实实地投入时间和注意力。这个结果不是贬义，更像是那种认真到有点可爱的稳定型选手。"
  },
  "B-011": {
    title: "手艺精湛的木匠",
    tag: "务实、沉稳、重完成度",
    analysis: "你更关注把事情真正做出来，而不是只停留在想法层面。你不喜欢过度虚浮的表达，偏向一点点打磨、最后交付一个扎实的成果。这个结果对应的是低噪音、高完成度的人。"
  },
  "B-100": {
    title: "有创意风格的建筑师",
    tag: "既讲结构，也讲审美",
    analysis: "你的答案很像会在规则内做创新的人。你既不想完全乱来，也不甘于只做标准件，而是倾向于在秩序、功能和个人表达之间找到平衡。这个结果适合能把想法落成方案的人。"
  },
  "B-101": {
    title: "富有想象力的导演",
    tag: "有统筹、有表达、能构建场景",
    analysis: "你对人的反应、机会的节奏、世界的叙事方式都有自己的感知。你既能看到结构，也会忍不住去想画面感和戏剧张力。这个结果对应能把很多元素组织成一个完整故事的人。"
  },
  "B-110": {
    title: "对学生负责的好老师",
    tag: "稳、耐心、愿意和人打交道",
    analysis: "你的回答里有一种很平衡的责任感：既希望事情往前推进，也愿意顾及他人的接受度。你通常不会一味强压，而更像边解释边带着别人往前走。这个结果适合那种能稳定影响身边人的类型。"
  },
  "B-111": {
    title: "善于沟通的销售员",
    tag: "会拿捏节奏、懂人心、目标感强",
    analysis: "你很擅长在现实和人情之间找路径。面对竞争和关系时，你往往既看结果，也看怎么把话说到位、把局面推动起来。这个结果对应能在交流里完成任务的人。"
  },
  "C-000": {
    title: "吃货美食家",
    tag: "感受导向、活在当下、重体验",
    analysis: "你的答案里有一种顺着感觉走的松弛感。相比宏大目标和强控制欲，你更在意生活是不是舒服、体验是不是到位。这个结果适合那种知道怎么让自己过得有滋味的人。"
  },
  "C-001": {
    title: "如同毕加索一样的抽象派画家",
    tag: "表达跳脱、脑回路特别、审美优先",
    analysis: "你的作答很有个人风格，不太像按标准答案生活的人。你可能并不总想解释自己，但会用自己熟悉的方式理解世界。这个结果对应那种不按常规线条出牌的创作者气质。"
  },
  "C-010": {
    title: "悉心照料孩子的家庭主妇",
    tag: "重情感、顾关系、生活感强",
    analysis: "你比较在意人与人之间的温度，以及现实日子里的细碎感受。做决定时你不一定最讲效率，但很会考虑情绪后果和长期相处。这个结果对应把生活经营得柔软细致的人。"
  },
  "C-011": {
    title: "眼光独到的时尚设计师",
    tag: "有感觉、有风格、擅长个人表达",
    analysis: "你不太喜欢被单一规则定义，更愿意按照自己的审美和感受判断世界。你的答案里有明显的个体色彩和风格意识。这个结果对应那种能把自我表达变成辨识度的人。"
  },
  "C-100": {
    title: "细心照料的护士",
    tag: "温和、耐心、会照顾别人的状态",
    analysis: "你对情绪、疲惫和人的状态比较敏感，不容易完全忽视别人的感受。虽然不一定锋芒毕露，但通常能在具体处提供稳定照料。这个结果对应让人感觉被接住的人。"
  },
  "C-101": {
    title: "能说会道的律师",
    tag: "情绪敏感，但也会为自己争取",
    analysis: "你的答案不是一味退让型，而是既有感受力，也有为自己辩护和争取空间的意识。你遇到问题时，往往会试着讲道理、找依据、说明立场。这个结果适合那种能把立场讲清楚的人。"
  },
  "C-110": {
    title: "无所畏惧的特种兵",
    tag: "外柔内韧、关键时刻不掉线",
    analysis: "你平时未必最显眼，但真正遇到压力和竞争时并不容易塌。你有自己的节奏和耐力，也能在必要时突然变得很硬。这个结果对应那种平时低调、关键时刻能扛事的人。"
  },
  "C-111": {
    title: "运筹帷幄的CEO",
    tag: "既看人，也看局，还会留后手",
    analysis: "你的答案里混合了感受力、判断力和策略意识。你不会只盯着眼前一步，而是更像会同时看关系、机会和备选路径的人。这个结果对应擅长综合权衡、调配资源的人。"
  }
};

function pickDominant(counts: Record<OptionKey, number>, answers: Record<number, OptionKey>): OptionKey {
  const entries: [OptionKey, number][] = [
    ["A", counts.A],
    ["B", counts.B],
    ["C", counts.C]
  ];
  entries.sort((a, b) => b[1] - a[1]);
  if (entries[0][1] !== entries[1][1]) return entries[0][0];

  const tieBreakers = [10, 8, 3, 1, 2, 4, 5, 6, 7, 9];
  for (const qid of tieBreakers) {
    const answer = answers[qid];
    if (answer && entries.some(([key, count]) => count === entries[0][1] && key === answer)) {
      return answer;
    }
  }
  return "B";
}

function getResult(answers: Record<number, OptionKey>): Result {
  const counts = { A: 0, B: 0, C: 0 } as Record<OptionKey, number>;
  Object.values(answers).forEach((key) => {
    counts[key] += 1;
  });

  const dominant = pickDominant(counts, answers);

  const structureScore = [
    answers[3] === "A" ? 2 : answers[3] === "B" ? 1 : 0,
    answers[7] === "B" ? 2 : answers[7] === "A" ? 1 : 0,
    answers[8] === "C" ? 2 : answers[8] === "B" ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  const peopleScore = [
    answers[2] === "A" ? 2 : answers[2] === "B" ? 1 : 0,
    answers[5] === "B" ? 2 : answers[5] === "A" ? 1 : 0,
    answers[6] === "A" ? 2 : answers[6] === "C" ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  const imaginationScore = [
    answers[4] === "A" ? 2 : answers[4] === "B" ? 1 : 0,
    answers[9] === "A" ? 2 : answers[9] === "B" ? 1 : 0,
    answers[10] === "C" ? 2 : answers[10] === "A" ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  const code = `${dominant}-${structureScore >= 3 ? 1 : 0}${peopleScore >= 3 ? 1 : 0}${imaginationScore >= 3 ? 1 : 0}`;
  return resultMap[code];
}

export default function HomePage() {
  const [answers, setAnswers] = useState<Record<number, OptionKey>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const result = useMemo(() => getResult(answers), [answers]);

  const handleSelect = (questionId: number, optionKey: OptionKey) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
  };

  const handleSubmit = () => {
    if (answeredCount !== questions.length) {
      alert("请先完成所有题目再提交。");
      return;
    }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="page">
      <div className="container">
        <section className="hero">
          <div className="badge">24种人格趣味版 · GitHub + Vercel</div>
          <h1 className="title">zhabti 测试样卷</h1>
          <p className="subtitle">
            完成 10 道选择题后，系统会基于你的作答风格，在 24 种趣味人格标签中匹配出一个结果。
          </p>
          <p className="notice">
            版权：本测试由美国西北大学 zha 同学制定，以下为样卷，并非真实测试，结果不具备任何参考意义。
          </p>
        </section>

        {submitted && (
          <section className="card">
            <div className="resultHeader">
              <div>
                <div className="questionNumber">测试结果</div>
                <h2 className="questionText" style={{ marginBottom: 0 }}>
                  {result.title}
                </h2>
                <div className="resultTag">{result.tag}</div>
              </div>
              <div className="scoreBox">
                已完成
                <strong>{answeredCount}</strong>
                <span>共 {questions.length} 题</span>
              </div>
            </div>
            <div className="analysis">{result.analysis}</div>
            <div className="analysis" style={{ marginTop: 14, fontSize: 14, color: "#6b7280" }}>
              说明：这是一个趣味映射版本。我已经把你给的 24 个标签全部做进去了，系统会根据主导选项风格 + 三个维度组合自动匹配结果。后续你如果想指定“某一题某个选项必须更偏向某种人格”，我可以继续精调映射规则。
            </div>
          </section>
        )}

        {questions.map((question) => (
          <section className="card" key={question.id}>
            <div className="questionNumber">第 {question.id} 题</div>
            <h2 className="questionText">{question.text}</h2>
            <div className="options">
              {question.options.map((option) => {
                const checked = answers[question.id] === option.key;
                return (
                  <label key={option.key} className={`option ${checked ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      checked={checked}
                      onChange={() => handleSelect(question.id, option.key)}
                    />
                    <span>
                      <strong>{option.key}. </strong>
                      {option.text}
                    </span>
                  </label>
                );
              })}
            </div>
          </section>
        ))}

        <div className="stickyBar">
          <div className="actionBox">
            <div>
              <div className="progress">
                已完成 {answeredCount} / {questions.length} 题
              </div>
              <div style={{ color: "#6b7280", fontSize: 14, marginTop: 4 }}>
                全部完成后即可查看 24 种趣味人格中的匹配结果
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button className="secondaryBtn" onClick={handleReset}>
                重新开始
              </button>
              <button className="primaryBtn" onClick={handleSubmit}>
                提交并查看结果
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
