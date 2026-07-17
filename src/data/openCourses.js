// 2026年公开课汇总表（按时间排序）— 数据源：2026年公开课汇总表.xlsx
// 不含「顾问」列

const regionMap = {
  north: { zh: '北区', en: 'North' },
  south: { zh: '南区', en: 'South' },
  east: { zh: '东区', en: 'East' },
}

const cityMap = {
  beijing: { zh: '北京', en: 'Beijing' },
  shanghai: { zh: '上海', en: 'Shanghai' },
  shenzhen: { zh: '深圳', en: 'Shenzhen' },
}

const statusMap = {
  delivered: { zh: '已交付', en: 'Delivered' },
  confirmed: { zh: '确定', en: 'Confirmed' },
  tbd: { zh: '待定', en: 'TBD' },
}

// 项目标签配色（跟随品牌色系）
const programColors = {
  CM: 'var(--purple)',
  TS: 'var(--teal)',
  MS: 'var(--pink)',
  AI: 'var(--orange)',
  TC: 'var(--purple-dark)',
}

export function getProgramColor(program) {
  if (program.includes('AI')) return programColors.AI
  if (program.startsWith('MS')) return programColors.MS
  if (program.startsWith('TS')) return programColors.TS
  if (program.startsWith('TC')) return programColors.TC
  return programColors.CM
}

const rows = [
  { month: 6, date: { zh: '2026年06月05日', en: 'Jun 5, 2026' }, region: 'south', name: { zh: 'ChangeMan变革领导力（引领变革，穿越变化周期）', en: 'ChangeMan Change Leadership (Leading Change, Navigating Cycles)' }, program: 'CM', city: 'shenzhen', lecturer: { zh: 'Olive', en: 'Olive' }, status: 'delivered', time: { zh: '9:00-17:00', en: '9:00-17:00' } },
  { month: 7, date: { zh: '2026年07月03日', en: 'Jul 3, 2026' }, region: 'east', name: { zh: 'TeamSynergy-AI时代的团队协同（AI时代下如何带兵持续打胜战）', en: 'TeamSynergy: AI-Era Team Collaboration (Leading Teams to Victory in the AI Era)' }, program: 'TS', city: 'shanghai', lecturer: { zh: 'Julia', en: 'Julia' }, status: 'delivered', time: { zh: '9:00-16:00', en: '9:00-16:00' } },
  { month: 7, date: { zh: '2026年07月22日', en: 'Jul 22, 2026' }, region: 'north', name: { zh: 'ChangeMan变革领导力（演示TypeCoach）+ TeamSynergy-AI时代的团队协同', en: 'ChangeMan Change Leadership (TypeCoach Demo) + TeamSynergy: AI-Era Team Collaboration' }, program: 'CM+TS', city: 'beijing', lecturer: { zh: 'Olive+Gina', en: 'Olive + Gina' }, status: 'confirmed', time: { zh: '9:00-17:00', en: '9:00-17:00' } },
  { month: 7, date: { zh: '2026年07月25日', en: 'Jul 25, 2026' }, region: 'south', name: { zh: 'ChangeMan AI版变革领导力（AI驱动的变革领导力实践）', en: 'ChangeMan AI Edition: Change Leadership (AI-Driven Change Leadership Practice)' }, program: 'CM AI', city: 'shenzhen', lecturer: { zh: '张凯', en: 'Zhang Kai' }, status: 'confirmed', time: { zh: '9:00-17:00', en: '9:00-17:00' } },
  { month: 8, date: { zh: '2026年08月07日', en: 'Aug 7, 2026' }, region: 'south', name: { zh: 'TeamSynergy-AI时代的团队协同（AI时代下如何带兵持续打胜战）', en: 'TeamSynergy: AI-Era Team Collaboration (Leading Teams to Victory in the AI Era)' }, program: 'TS', city: 'shenzhen', lecturer: { zh: '彩波', en: 'Caibo' }, status: 'confirmed', time: { zh: '9:00-13:00', en: '9:00-13:00' } },
  { month: 8, date: { zh: '2026年08月13日-14日', en: 'Aug 13-14, 2026' }, region: 'east', name: { zh: 'ChangeMan AI版变革领导力认证（引领变革，穿越变化周期）', en: 'ChangeMan AI Edition Change Leadership Certification (Leading Change, Navigating Cycles)' }, program: 'CM AI认证', city: 'shanghai', lecturer: { zh: 'Olive', en: 'Olive' }, status: 'confirmed', time: { zh: '9:00-17:00', en: '9:00-17:00' } },
  { month: 8, date: { zh: '2026年08月21日', en: 'Aug 21, 2026' }, region: 'south', name: { zh: 'TeamSynergy-AI时代的团队协同（AI时代下如何带兵持续打胜战）', en: 'TeamSynergy: AI-Era Team Collaboration (Leading Teams to Victory in the AI Era)' }, program: 'TS', city: 'shenzhen', lecturer: { zh: '彩波（白杰）', en: 'Caibo (Bai Jie)' }, status: 'confirmed', time: { zh: '9:00-13:00', en: '9:00-13:00' } },
  { month: 8, date: { zh: '2026年08月28日', en: 'Aug 28, 2026' }, region: 'north', name: { zh: 'ChangeMan变革领导力（演示TypeCoach）+ TypeCoach', en: 'ChangeMan Change Leadership (TypeCoach Demo) + TypeCoach' }, program: 'CM+TC', city: 'beijing', lecturer: { zh: 'Olive', en: 'Olive' }, status: 'confirmed', time: { zh: '9:00-17:00', en: '9:00-17:00' } },
  { month: 9, date: { zh: '2026年09月03日', en: 'Sep 3, 2026' }, region: 'south', name: { zh: 'TeamSynergy-AI时代的团队协同（AI时代下如何带兵持续打胜战）', en: 'TeamSynergy: AI-Era Team Collaboration (Leading Teams to Victory in the AI Era)' }, program: 'TS', city: 'shenzhen', lecturer: { zh: '彩波（白杰）', en: 'Caibo (Bai Jie)' }, status: 'confirmed', time: { zh: '9:00-13:00', en: '9:00-13:00' } },
  { month: 9, date: { zh: '2026年09月04日', en: 'Sep 4, 2026' }, region: 'east', name: { zh: 'ChangeMan变革领导力（引领变革，穿越变化周期）+ TeamSynergy-AI时代的团队协同（AI时代下如何带兵持续打胜战）', en: 'ChangeMan Change Leadership (Leading Change, Navigating Cycles) + TeamSynergy: AI-Era Team Collaboration' }, program: 'CM+TS', city: 'shanghai', lecturer: { zh: 'Julia', en: 'Julia' }, status: 'tbd', time: { zh: '9:00-16:00', en: '9:00-16:00' } },
  { month: 9, date: { zh: '2026年09月15日', en: 'Sep 15, 2026' }, region: 'south', name: { zh: 'TeamSynergy-AI时代的团队协同（AI时代下如何带兵持续打胜战）', en: 'TeamSynergy: AI-Era Team Collaboration (Leading Teams to Victory in the AI Era)' }, program: 'TS', city: 'shenzhen', lecturer: { zh: 'Julia', en: 'Julia' }, status: 'tbd', time: { zh: '9:00-16:00', en: '9:00-16:00' } },
  { month: 9, date: { zh: '2026年09月23日', en: 'Sep 23, 2026' }, region: 'north', name: { zh: 'TeamSynergy-AI时代的团队协同（AI时代下如何带兵持续打胜战）', en: 'TeamSynergy: AI-Era Team Collaboration (Leading Teams to Victory in the AI Era)' }, program: 'TS', city: 'beijing', lecturer: { zh: 'Julia', en: 'Julia' }, status: 'confirmed', time: { zh: '9:00-17:00', en: '9:00-17:00' } },
  { month: 9, date: { zh: '2026年09月24日', en: 'Sep 24, 2026' }, region: 'north', name: { zh: 'ChangeMan变革领导力（引领变革，穿越变化周期）', en: 'ChangeMan Change Leadership (Leading Change, Navigating Cycles)' }, program: 'CM', city: 'beijing', lecturer: { zh: 'Julia', en: 'Julia' }, status: 'confirmed', time: { zh: '9:00-17:00', en: '9:00-17:00' } },
  { month: 10, date: { zh: '2026年10月22日', en: 'Oct 22, 2026' }, region: 'east', name: { zh: 'MarkSimos像CEO一样思考与行动（AI版，掌握经典商业思维）', en: 'MarkSimos: Think & Act Like a CEO (AI Edition, Mastering Classic Business Thinking)' }, program: 'MS AI', city: 'shanghai', lecturer: { zh: 'Olive', en: 'Olive' }, status: 'confirmed', time: { zh: '9:00-16:00', en: '9:00-16:00' } },
  { month: 10, date: { zh: '2026年10月23日', en: 'Oct 23, 2026' }, region: 'south', name: { zh: 'TeamSynergy-AI时代的团队协同（AI时代下如何带兵持续打胜战）', en: 'TeamSynergy: AI-Era Team Collaboration (Leading Teams to Victory in the AI Era)' }, program: 'TS', city: 'shenzhen', lecturer: { zh: '彩波（白杰）', en: 'Caibo (Bai Jie)' }, status: 'confirmed', time: { zh: '9:00-13:00', en: '9:00-13:00' } },
  { month: 10, date: { zh: '2026年10月23日', en: 'Oct 23, 2026' }, region: 'north', name: { zh: 'MarkSimos像CEO一样思考与行动（AI版，掌握经典商业思维）', en: 'MarkSimos: Think & Act Like a CEO (AI Edition, Mastering Classic Business Thinking)' }, program: 'MS', city: 'beijing', lecturer: { zh: 'Olive', en: 'Olive' }, status: 'confirmed', time: { zh: '9:00-17:00', en: '9:00-17:00' } },
  { month: 10, date: { zh: '2026年10月30日', en: 'Oct 30, 2026' }, region: 'south', name: { zh: 'MarkSimos像CEO一样思考与行动（AI版，掌握经典商业思维）', en: 'MarkSimos: Think & Act Like a CEO (AI Edition, Mastering Classic Business Thinking)' }, program: 'MS AI', city: 'shenzhen', lecturer: { zh: 'Olive', en: 'Olive' }, status: 'confirmed', time: { zh: '9:00-17:00', en: '9:00-17:00' } },
  { month: 11, date: { zh: '2026年11月06日', en: 'Nov 6, 2026' }, region: 'south', name: { zh: 'TeamSynergy-AI时代的团队协同（AI时代下如何带兵持续打胜战）', en: 'TeamSynergy: AI-Era Team Collaboration (Leading Teams to Victory in the AI Era)' }, program: 'TS', city: 'shenzhen', lecturer: { zh: '彩波（白杰）', en: 'Caibo (Bai Jie)' }, status: 'confirmed', time: { zh: '9:00-13:00', en: '9:00-13:00' } },
  { month: 11, date: { zh: '2026年11月20日', en: 'Nov 20, 2026' }, region: 'south', name: { zh: 'ChangeMan变革领导力（引领变革，穿越变化周期）+ TeamSynergy-AI时代的团队协同', en: 'ChangeMan Change Leadership (Leading Change, Navigating Cycles) + TeamSynergy: AI-Era Team Collaboration' }, program: 'CM+TS线下', city: 'shenzhen', lecturer: { zh: '彩波（Olive）', en: 'Caibo (Olive)' }, status: 'confirmed', time: { zh: '9:00-17:00', en: '9:00-17:00' } },
  { month: 11, date: { zh: '2026年11月26日', en: 'Nov 26, 2026' }, region: 'east', name: { zh: 'ChangeMan变革领导力（引领变革，穿越变化周期）+ TeamSynergy-AI时代的团队协同（AI时代下如何带兵持续打胜战）', en: 'ChangeMan Change Leadership (Leading Change, Navigating Cycles) + TeamSynergy: AI-Era Team Collaboration' }, program: 'CM+TS', city: 'shanghai', lecturer: { zh: 'Olive', en: 'Olive' }, status: 'confirmed', time: { zh: '9:00-17:00', en: '9:00-17:00' } },
  { month: 11, date: { zh: '2026年11月27日', en: 'Nov 27, 2026' }, region: 'north', name: { zh: 'ChangeMan变革领导力（引领变革，穿越变化周期）+ TypeCoach', en: 'ChangeMan Change Leadership (Leading Change, Navigating Cycles) + TypeCoach' }, program: 'TC+CM', city: 'beijing', lecturer: { zh: 'Olive', en: 'Olive' }, status: 'confirmed', time: { zh: '9:00-17:00', en: '9:00-17:00' } },
  { month: 12, date: { zh: '2026年12月11日', en: 'Dec 11, 2026' }, region: 'south', name: { zh: 'TeamSynergy-AI时代的团队协同（AI时代下如何带兵持续打胜战）', en: 'TeamSynergy: AI-Era Team Collaboration (Leading Teams to Victory in the AI Era)' }, program: 'TS', city: 'shenzhen', lecturer: { zh: '彩波（白杰）', en: 'Caibo (Bai Jie)' }, status: 'confirmed', time: { zh: '9:00-13:00', en: '9:00-13:00' } },
  { month: 12, date: { zh: '2026年12月17日', en: 'Dec 17, 2026' }, region: 'east', name: { zh: 'ChangeMan变革领导力（引领变革，穿越变化周期）+ TeamSynergy-AI时代的团队协同（AI时代下如何带兵持续打胜战）', en: 'ChangeMan Change Leadership (Leading Change, Navigating Cycles) + TeamSynergy: AI-Era Team Collaboration' }, program: 'CM+TS', city: 'shanghai', lecturer: { zh: 'Olive', en: 'Olive' }, status: 'confirmed', time: { zh: '9:00-17:00', en: '9:00-17:00' } },
  { month: 12, date: { zh: '2026年12月18日', en: 'Dec 18, 2026' }, region: 'north', name: { zh: 'MarkSimos像CEO一样思考与行动（AI版，掌握经典商业思维）', en: 'MarkSimos: Think & Act Like a CEO (AI Edition, Mastering Classic Business Thinking)' }, program: 'MS', city: 'beijing', lecturer: { zh: 'Olive', en: 'Olive' }, status: 'confirmed', time: { zh: '9:00-17:00', en: '9:00-17:00' } },
]

export const openCourseRegionKeys = ['all', 'north', 'south', 'east']

export function getOpenCourses(locale) {
  const l = locale === 'en' ? 'en' : 'zh'
  return rows.map((row, index) => ({
    id: index,
    month: row.month,
    regionKey: row.region,
    statusKey: row.status,
    program: row.program,
    date: row.date[l],
    region: regionMap[row.region][l],
    name: row.name[l],
    city: cityMap[row.city][l],
    lecturer: row.lecturer[l],
    status: statusMap[row.status][l],
    time: row.time[l],
  }))
}
