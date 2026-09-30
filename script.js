const students = [
  { name: 'Jessa Mae Silva', email: 'jessa.silva@tupi.edu', status: 'active', phone: '+63 927 401 2288', location: 'Poblacion' },
  { name: 'Ruben Dela Cruz', email: 'ruben.dc@tupi.edu', status: 'inactive', phone: '+63 917 836 9421', location: 'Silway Proper' },
  { name: 'Aisha Lumang', email: 'aisha.l@tupi.edu', status: 'active', phone: '+63 995 332 1194', location: 'Crossing' },
  { name: 'Marc Ken Bañares', email: 'marc.b@tupi.edu', status: 'active', phone: '+63 912 443 2813', location: 'Outskirts' }
];

const courses = [
  { code: 'CS101', title: 'Intro to Computing', instructor: 'Ms. Ann Flores', level: 'Beginner', students: 24, completion: '82%' },
  { code: 'PSY201', title: 'Human Behavior', instructor: 'Dr. R. Datu', level: 'Intermediate', students: 16, completion: '71%' },
  { code: 'MATH201', title: 'Statistics', instructor: 'Ms. D. Rivera', level: 'Advanced', students: 11, completion: '65%' }
];

const enrollments = [
  { student: 'Jessa Mae Silva', course: 'CS101', status: 'Enrolled', progress: '82%' },
  { student: 'Ruben Dela Cruz', course: 'PSY201', status: 'Completed', progress: '100%' },
  { student: 'Aisha Lumang', course: 'MATH201', status: 'Enrolled', progress: '71%' },
  { student: 'Marc Ken Bañares', course: 'CS101', status: 'Completed', progress: '96%' }
];

const assignments = [
  { title: 'Case Analysis Report', course: 'CS101', due: 'Mar 14, 2026', status: 'Overdue', score: '86%' },
  { title: 'Research Summary', course: 'PSY201', due: 'Mar 18, 2026', status: 'Due Soon', score: '91%' },
  { title: 'Statistics Quiz', course: 'MATH201', due: 'Mar 20, 2026', status: 'In Review', score: '78%' }
];

const modalSchemas = {
  student: {
    title: 'Add Student',
    fields: [
      { name: 'name', label: 'Full name', type: 'text', placeholder: 'Juan Dela Cruz' },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'student@tupi.edu' },
      { name: 'phone', label: 'Phone', type: 'text', placeholder: '+63 912 345 6789' },
      { name: 'status', label: 'Status', type: 'select', options: ['active', 'inactive'] }
    ]
  },
  course: {
    title: 'Add Course',
    fields: [
      { name: 'code', label: 'Course code', type: 'text', placeholder: 'ENG202' },
      { name: 'title', label: 'Course title', type: 'text', placeholder: 'Academic Writing' },
      { name: 'instructor', label: 'Instructor', type: 'text', placeholder: 'Ms. Santos' },
      { name: 'level', label: 'Level', type: 'select', options: ['Beginner', 'Intermediate', 'Advanced'] }
    ]
  },
  enrollment: {
    title: 'New Enrollment',
    fields: [
      { name: 'student', label: 'Student', type: 'text', placeholder: 'Complete name' },
      { name: 'course', label: 'Course', type: 'text', placeholder: 'CS101' },
      { name: 'status', label: 'Status', type: 'select', options: ['Enrolled', 'Completed'] },
      { name: 'progress', label: 'Progress', type: 'text', placeholder: '65%' }
    ]
  },
  assignment: {
    title: 'Add Assignment',
    fields: [
      { name: 'title', label: 'Assignment title', type: 'text', placeholder: 'Capstone Draft' },
      { name: 'course', label: 'Course', type: 'text', placeholder: 'CS101' },
      { name: 'due', label: 'Due date', type: 'date' },
      { name: 'status', label: 'Status', type: 'select', options: ['Due Soon', 'In Review', 'Overdue'] }
    ]
  }
};

function renderStudents() {
  const searchInput = document.getElementById('student-search');
  const filterSelect = document.getElementById('student-filter');
  const table = document.getElementById('students-table');

  if (!table) return;

  const query = (searchInput?.value || '').trim().toLowerCase();
  const filter = filterSelect?.value || 'all';

  const filtered = students.filter((student) => {
    const matchesQuery = !query || `${student.name} ${student.email}`.toLowerCase().includes(query);
    const matchesStatus = filter === 'all' || student.status === filter;
    return matchesQuery && matchesStatus;
  });

  table.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Student</th>
          <th>Contact</th>
          <th>Location</th>
          <th>Enrolled</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map((student) => {
          const initials = student.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();
          const enrolledDate = 'Sep 25, 2026';

          return `
            <tr>
              <td>
                <div class="student-cell">
                  <div class="avatar">${initials}</div>
                  <div class="student-meta">
                    <strong>${student.name}</strong>
                    <small>${student.email}</small>
                  </div>
                </div>
              </td>
              <td class="contact-cell">
                <div class="contact-line"><span class="cell-icon">✉</span> ${student.email}</div>
                <div class="contact-line"><span class="cell-icon">☎</span> ${student.phone}</div>
              </td>
              <td class="location-cell">
                <span class="cell-icon">◎</span> ${student.location}, South Cotabato, Philippines
              </td>
              <td class="enrolled-cell">${enrolledDate}</td>
              <td>
                <span class="status-pill ${student.status}"><span class="status-dot"></span>${student.status}</span>
              </td>
              <td>
                <div class="table-actions">
                  <button class="action-btn" type="button" aria-label="Edit student">✎</button>
                  <button class="action-btn" type="button" aria-label="Delete student">🗑</button>
                </div>
              </td>
            </tr>
          `;
        }).join('') || `<tr><td colspan="6" style="padding: 24px; color: var(--muted); text-align: center;">No students match your filters.</td></tr>`}
      </tbody>
    </table>
  `;
}

function renderCourses() {
  const searchInput = document.getElementById('course-search');
  const filterSelect = document.getElementById('course-filter');
  const grid = document.getElementById('courses-grid');

  if (!grid) return;

  const query = (searchInput?.value || '').trim().toLowerCase();
  const filter = filterSelect?.value || 'all';

  const filtered = courses.filter((course) => {
    const matchesQuery = !query || `${course.code} ${course.title} ${course.instructor}`.toLowerCase().includes(query);
    const matchesLevel = filter === 'all' || course.level === filter;
    return matchesQuery && matchesLevel;
  });

  grid.innerHTML = filtered.map((course) => `
    <article class="course-card">
      <div class="course-header">
        <div class="course-code-badge">${course.code.slice(0, 2)}</div>
        <span class="level-tag">${course.level}</span>
      </div>
      <h3>${course.title}</h3>
      <p>${course.code} • ${course.instructor}</p>
      <div class="course-meta">
        <div class="meta-box"><span>Students</span><strong>${course.students}</strong></div>
        <div class="meta-box"><span>Progress</span><strong>${course.completion}</strong></div>
        <div class="meta-box"><span>Rating</span><strong>4.7</strong></div>
      </div>
      <div class="course-footer">
        <small>Updated recently</small>
        <button class="ghost-btn" type="button">Open</button>
      </div>
    </article>
  `).join('') || '<div class="empty-state" style="grid-column: 1 / -1;">No courses match your filters.</div>';
}

function renderEnrollments() {
  const searchInput = document.getElementById('enrollment-search');
  const filterSelect = document.getElementById('enrollment-filter');
  const table = document.getElementById('enrollment-table');

  if (!table) return;

  const query = (searchInput?.value || '').trim().toLowerCase();
  const filter = filterSelect?.value || 'all';

  const filtered = enrollments.filter((entry) => {
    const matchesQuery = !query || `${entry.student} ${entry.course}`.toLowerCase().includes(query);
    const matchesStatus = filter === 'all' || entry.status === filter;
    return matchesQuery && matchesStatus;
  });

  table.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Student</th>
          <th>Course</th>
          <th>Progress</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map((entry) => `
          <tr>
            <td>${entry.student}</td>
            <td>${entry.course}</td>
            <td>${entry.progress}</td>
            <td><span class="status-pill ${entry.status === 'Completed' ? 'active' : 'inactive'}">${entry.status}</span></td>
            <td><button class="action-btn" type="button">View</button></td>
          </tr>
        `).join('') || `<tr><td colspan="5" style="padding: 24px; color: var(--muted); text-align: center;">No enrollment records match your search.</td></tr>`}
      </tbody>
    </table>
  `;
}

function renderAssignments() {
  const searchInput = document.getElementById('assignment-search');
  const filterSelect = document.getElementById('assignment-filter');
  const list = document.getElementById('assignments-list');

  if (!list) return;

  const query = (searchInput?.value || '').trim().toLowerCase();
  const filter = filterSelect?.value || 'all';

  const filtered = assignments.filter((item) => {
    const matchesQuery = !query || `${item.title} ${item.course}`.toLowerCase().includes(query);
    const matchesFilter = filter === 'all' || item.course === filter;
    return matchesQuery && matchesFilter;
  });

  list.innerHTML = filtered.map((item) => `
    <article class="assignment-item">
      <div class="assignment-main">
        <div class="assignment-badge">${item.course.slice(0, 2)}</div>
        <div>
          <h4>${item.title} ${item.status === 'Overdue' ? '<span class="overdue-tag">Overdue</span>' : ''}</h4>
          <p>${item.course} • Due ${item.due}</p>
        </div>
      </div>
      <div class="assignment-meta">
        <span>${item.score}</span>
        <span>${item.status}</span>
      </div>
    </article>
  `).join('') || '<div class="empty-state">No assignments match your filters.</div>';
}

function switchPage(pageName) {
  const pages = document.querySelectorAll('.page-panel');
  const buttons = document.querySelectorAll('.nav-item');

  pages.forEach((panel) => {
    panel.classList.toggle('visible', panel.id === `${pageName}-page`);
  });

  buttons.forEach((button) => {
    button.classList.toggle('active', button.dataset.page === pageName);
  });
}

function openModal(type) {
  const schema = modalSchemas[type];
  const modal = document.getElementById('modal-root');
  const modalTitle = document.getElementById('modal-title');
  const modalFields = document.getElementById('modal-fields');

  if (!schema || !modal || !modalTitle || !modalFields) return;

  modalTitle.textContent = schema.title;
  modalFields.innerHTML = schema.fields.map((field) => {
    const base = `
      <div class="modal-field">
        <label for="field-${field.name}">${field.label}</label>
        ${field.type === 'select'
          ? `<select id="field-${field.name}" name="${field.name}">
              ${field.options.map((option) => `<option value="${option}">${option}</option>`).join('')}
            </select>`
          : `<input id="field-${field.name}" type="${field.type}" name="${field.name}" placeholder="${field.placeholder || ''}" ${field.type === 'date' ? 'value="2026-03-20"' : ''} />`
      }
      </div>
    `;
    return base;
  }).join('');

  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  const modal = document.getElementById('modal-root');
  if (!modal) return;
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

function showDashboardView() {
  document.body.classList.add('dashboard-visible');
  switchPage('dashboard');
}

function showHomeView() {
  document.body.classList.remove('dashboard-visible');
}

function bindEvents() {
  document.querySelectorAll('.nav-item').forEach((button) => {
    if (button.id === 'home-dashboard-btn') {
      button.addEventListener('click', showHomeView);
      return;
    }
    button.addEventListener('click', () => switchPage(button.dataset.page));
  });

  document.querySelectorAll('[data-open-modal]').forEach((button) => {
    button.addEventListener('click', () => openModal(button.dataset.openModal));
  });

  document.querySelector('[data-page-target="map"]').addEventListener('click', () => switchPage('map'));
  document.getElementById('close-modal')?.addEventListener('click', closeModal);
  document.getElementById('cancel-modal')?.addEventListener('click', closeModal);
  document.getElementById('signin-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    showDashboardView();
  });

  document.getElementById('modal-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    closeModal();
  });

  document.getElementById('student-search')?.addEventListener('input', renderStudents);
  document.getElementById('student-filter')?.addEventListener('change', renderStudents);
  document.getElementById('course-search')?.addEventListener('input', renderCourses);
  document.getElementById('course-filter')?.addEventListener('change', renderCourses);
  document.getElementById('enrollment-search')?.addEventListener('input', renderEnrollments);
  document.getElementById('enrollment-filter')?.addEventListener('change', renderEnrollments);
  document.getElementById('assignment-search')?.addEventListener('input', renderAssignments);
  document.getElementById('assignment-filter')?.addEventListener('change', renderAssignments);

  document.getElementById('show-location-btn')?.addEventListener('click', () => {
    const statusText = document.getElementById('location-status-text');
    const button = document.getElementById('show-location-btn');
    const fallbackLabel = '6°20\'09.40"N, 124°56\'51.42"E · Tupi, South Cotabato';

    if (!navigator.geolocation) {
      statusText.textContent = fallbackLabel;
      return;
    }

    button.textContent = 'Locating...';

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const text = `Your location: ${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`;
        statusText.textContent = text;
        button.textContent = 'Show My Location';
      },
      () => {
        statusText.textContent = fallbackLabel;
        button.textContent = 'Show My Location';
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderStudents();
  renderCourses();
  renderEnrollments();
  renderAssignments();
  bindEvents();
  showHomeView();
});
