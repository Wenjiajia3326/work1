// ===== FILE: src/script.js =====
// 全局 JavaScript - 所有页面交互逻辑

document.addEventListener('DOMContentLoaded', function() {
  
  // ============================================================
  // 1. 全局功能
  // ============================================================
  
  // 汉堡菜单
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }
  
  // 导航栏滚动阴影
  const navbar = document.querySelector('.navbar');
  
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
  
  // ============================================================
  // 2. 首页功能
  // ============================================================
  
  // 数字滚动动画 - Intersection Observer + requestAnimationFrame
  const counters = document.querySelectorAll('.counter');
  const statsSection = document.querySelector('.stats');
  
  if (statsSection && counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    observer.observe(statsSection);
  }
  
  function animateCounters() {
    counters.forEach(counter => {
      const target = Number(counter.dataset.target);
      const duration = 2000;
      const startTime = performance.now();
      
      function easeOut(t) {
        return 1 - Math.pow(1 - t, 3);
      }
      
      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOut(progress);
        const currentValue = Math.floor(easedProgress * target);
        
        counter.textContent = currentValue;
        
        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      }
      
      requestAnimationFrame(updateCounter);
    });
  }
  
  // Hero CTA 平滑滚动
  const heroCta = document.querySelector('.hero-cta');
  
  if (heroCta) {
    heroCta.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector('#services');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
  
  // ============================================================
  // 3. 服务页功能
  // ============================================================
  
  // Tab 切换
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;
      
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(tabId).classList.add('active');
    });
  });
  
  // 价格切换
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  const amounts = document.querySelectorAll('.amount');
  const periods = document.querySelectorAll('.period');
  const saves = document.querySelectorAll('.pricing-save');
  
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const period = btn.dataset.period;
      
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      amounts.forEach(amount => {
        if (period === 'yearly') {
          amount.textContent = Number(amount.dataset.yearly).toLocaleString();
        } else {
          amount.textContent = Number(amount.dataset.monthly).toLocaleString();
        }
      });
      
      periods.forEach(p => {
        p.textContent = period === 'yearly' ? '/年' : '/月';
      });
      
      saves.forEach(save => {
        if (period === 'yearly') {
          save.classList.add('show');
        } else {
          save.classList.remove('show');
        }
      });
    });
  });
  
  // FAQ 手风琴
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(i => i.classList.remove('active'));
      
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
  
  // ============================================================
  // 4. 案例页功能
  // ============================================================
  
  // 案例筛选
  const filterBtns = document.querySelectorAll('.filter-btn');
  const caseCards = document.querySelectorAll('.case-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      caseCards.forEach(card => {
        const category = card.dataset.category;
        
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // 案例详情弹窗
  const modal = document.getElementById('caseModal');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalClose = document.querySelector('.modal-close');
  const modalTitle = document.getElementById('modalTitle');
  const modalTag = document.getElementById('modalTag');
  const modalDescription = document.getElementById('modalDescription');
  const modalTechStack = document.getElementById('modalTechStack');
  
  // 案例数据
  const casesData = {
    1: {
      title: '某商业银行',
      tag: '金融',
      description: '为某商业银行进行核心业务系统的全面数字化升级，包括网上银行、移动银行、信贷管理系统等。通过微服务架构重构，系统性能提升 300%，用户体验显著改善，日均交易量突破百万笔。',
      techStack: ['Java', 'Spring Cloud', 'MySQL', 'Redis', 'React']
    },
    2: {
      title: '某保险公司',
      tag: '金融',
      description: '开发移动理赔平台，实现从报案到理赔的全流程数字化。通过 OCR 识别、AI 审核等技术，理赔处理时间从 7 天缩短至 24 小时，客户满意度提升 40%。',
      techStack: ['React Native', 'Node.js', 'MongoDB', 'TensorFlow', 'AWS']
    },
    3: {
      title: '某零售集团',
      tag: '零售',
      description: '建设全渠道电商平台，整合线上商城、小程序、APP 等多个销售渠道。实现库存、订单、会员数据的统一管理，支持日均百万级订单处理，GMV 增长 200%。',
      techStack: ['Vue.js', 'Node.js', 'PostgreSQL', 'Elasticsearch', 'Docker']
    },
    4: {
      title: '某教育机构',
      tag: '教育',
      description: '开发在线学习管理系统，支持直播课程、录播视频、作业提交、在线考试等功能。服务超过 10 万学生用户，课程完课率提升 60%，教师工作效率提高 50%。',
      techStack: ['Angular', 'Python', 'Django', 'PostgreSQL', 'WebRTC']
    },
    5: {
      title: '某制造企业',
      tag: '制造',
      description: '构建智能工厂数据中台，整合生产设备、质量检测、供应链等数据。通过大数据分析和 AI 预测，实现设备故障预警、生产计划优化，年成本降低 40%。',
      techStack: ['Python', 'Spark', 'Kafka', 'InfluxDB', 'TensorFlow']
    },
    6: {
      title: '某物流公司',
      tag: '制造',
      description: '开发物流跟踪系统，实现从下单到签收的全程可视化。集成 GPS 定位、路径优化、智能调度等功能，配送效率提升 35%，客户投诉率降低 60%。',
      techStack: ['React', 'Node.js', 'MongoDB', 'Redis', 'Mapbox']
    }
  };
  
  caseCards.forEach(card => {
    card.addEventListener('click', () => {
      const caseId = card.dataset.id;
      const caseData = casesData[caseId];
      
      if (caseData) {
        modalTitle.textContent = caseData.title;
        modalTag.textContent = caseData.tag;
        modalDescription.textContent = caseData.description;
        
        modalTechStack.innerHTML = '';
        caseData.techStack.forEach(tech => {
          const tag = document.createElement('span');
          tag.className = 'tech-tag';
          tag.textContent = tech;
          modalTechStack.appendChild(tag);
        });
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }
  
  // ESC 键关闭弹窗
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
  
  // ============================================================
  // 5. 联系页功能
  // ============================================================
  
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.querySelector('.btn-submit');
  const successMessage = document.querySelector('.success-message');
  
  if (contactForm && submitBtn) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // 表单验证规则
    const validators = {
      name: (value) => value.trim() !== '',
      email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: (value) => value.trim().length >= 10
    };
    
    // 实时验证
    function validateField(field) {
      const value = field.value;
      const fieldName = field.name;
      const formGroup = field.closest('.form-group');
      
      if (validators[fieldName]) {
        const isValid = validators[fieldName](value);
        
        if (!isValid && value !== '') {
          formGroup.classList.add('error');
        } else {
          formGroup.classList.remove('error');
        }
        
        return isValid;
      }
      
      return true;
    }
    
    // 检查所有必填字段
    function checkAllFields() {
      const nameValid = validators.name(nameInput.value);
      const emailValid = validators.email(emailInput.value);
      const messageValid = validators.message(messageInput.value);
      
      if (nameValid && emailValid && messageValid) {
        submitBtn.classList.add('enabled');
        submitBtn.classList.remove('disabled');
      } else {
        submitBtn.classList.remove('enabled');
      }
    }
    
    // blur 事件验证
    [nameInput, emailInput, messageInput].forEach(field => {
      if (field) {
        field.addEventListener('blur', () => {
          validateField(field);
          checkAllFields();
        });
        
        field.addEventListener('input', () => {
          checkAllFields();
        });
      }
    });
    
    // 表单提交
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // 最终验证
      const nameValid = validateField(nameInput);
      const emailValid = validateField(emailInput);
      const messageValid = validateField(messageInput);
      
      if (!nameValid || !emailValid || !messageValid) {
        return;
      }
      
      // 显示加载状态
      submitBtn.classList.add('loading');
      submitBtn.innerHTML = '<span class="spinner"></span>提交中...';
      submitBtn.disabled = true;
      
      // 模拟提交
      setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.classList.add('success');
        submitBtn.innerHTML = '✓ 提交成功';
        
        successMessage.classList.add('show');
        
        // 重置表单
        setTimeout(() => {
          contactForm.reset();
          submitBtn.classList.remove('success', 'enabled');
          submitBtn.innerHTML = '提交';
          submitBtn.disabled = true;
          successMessage.classList.remove('show');
          
          document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
          });
        }, 3000);
      }, 1500);
    });
  }
  
  // ====== 增强：返回顶部按钮 ======
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
});
