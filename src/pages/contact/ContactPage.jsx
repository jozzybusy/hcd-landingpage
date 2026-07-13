import { useState } from 'react'
import Reveal from '../../components/shared/Reveal.jsx'
import styles from './ContactPage.module.css'

function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    employees: '',
    demand: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroShape1}></div>
        <div className={styles.heroShape2}></div>
        <div className="container">
          <Reveal className={styles.heroContent}>
            <p className={styles.heroLabel}>联系我们</p>
            <h1 className={styles.heroTitle}>
              让我们<span className={styles.accent}>开始合作</span>
            </h1>
            <p className={styles.heroDesc}>
              填写下方表单，我们的顾问将在24小时内与您联系，为您量身定制游戏化模拟课程方案。
            </p>
          </Reveal>
        </div>
      </section>

      {/* 表单 + 联系信息 */}
      <section className={styles.main}>
        <div className="container">
          <div className={styles.grid}>
            {/* 表单 */}
            <Reveal className={styles.formWrap}>
              {submitted ? (
                <div className={styles.success}>
                  <div className={styles.successIcon}>✓</div>
                  <h3>提交成功！</h3>
                  <p>感谢您的咨询，我们的顾问将在24小时内与您联系。</p>
                </div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <h2 className={styles.formTitle}>预约咨询</h2>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label>姓名 *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="请输入您的姓名"
                      />
                    </div>
                    <div className={styles.field}>
                      <label>公司 *</label>
                      <input
                        type="text"
                        name="company"
                        required
                        value={form.company}
                        onChange={handleChange}
                        placeholder="请输入公司名称"
                      />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label>手机 *</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="请输入手机号"
                      />
                    </div>
                    <div className={styles.field}>
                      <label>邮箱</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="请输入邮箱"
                      />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label>企业规模</label>
                      <select
                        name="employees"
                        value={form.employees}
                        onChange={handleChange}
                      >
                        <option value="">请选择</option>
                        <option value="50人以下">50人以下</option>
                        <option value="50-200人">50-200人</option>
                        <option value="200-1000人">200-1000人</option>
                        <option value="1000人以上">1000人以上</option>
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label>游戏化模拟课程需求</label>
                      <select
                        name="demand"
                        value={form.demand}
                        onChange={handleChange}
                      >
                        <option value="">请选择</option>
                        <option value="领导力">领导力发展</option>
                        <option value="定制游戏化模拟课程">企业定制游戏化模拟课程</option>
                        <option value="技能加速">技能加速营</option>
                        <option value="其他">其他</option>
                      </select>
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label>需求描述</label>
                    <textarea
                      name="message"
                      rows="4"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="请简要描述您的游戏化模拟课程需求..."
                    ></textarea>
                  </div>
                  <button type="submit" className={styles.submitBtn}>
                    提交咨询 →
                  </button>
                </form>
              )}
            </Reveal>

            {/* 联系信息 */}
            <Reveal className={styles.info} delay={0.1}>
              <h2 className={styles.infoTitle}>其他联系方式</h2>
              <div className={styles.infoItems}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>📞</div>
                  <div>
                    <div className={styles.infoLabel}>咨询热线</div>
                    <div className={styles.infoValue}>400-888-9999</div>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>✉️</div>
                  <div>
                    <div className={styles.infoLabel}>商务邮箱</div>
                    <div className={styles.infoValue}>hcd@hcdlearning.com</div>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>📍</div>
                  <div>
                    <div className={styles.infoLabel}>办公地址</div>
                    <div className={styles.infoValue}>北京 · 上海 · 深圳</div>
                  </div>
                </div>
              </div>
              <div className={styles.infoNote}>
                <p>工作时间：周一至周五 9:00 - 18:00</p>
                <p>我们将在收到您的咨询后24小时内回复。</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
