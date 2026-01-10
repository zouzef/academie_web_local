from flask import Blueprint, render_template, request, jsonify, session, redirect, url_for
import requests
from nacl.pwhash import verify

dashboard_bp = Blueprint('dashboard', __name__)


# Get sessions from SLC
def get_session_slc(account_id):
	url = f"https://172.28.20.5:5004/scl/get_session_detail/{account_id}"

	try:
		response = requests.get(url, verify=False, timeout=10)

		if response.status_code == 200:
			data = response.json()
			sessions = data.get('data', [])
			return sessions
		else:
			print(f"Error: API returned status {response.status_code}")
			return []

	except requests.exceptions.RequestException as e:
		print(f"Error fetching sessions: {e}")
		return []


def get_data_moderateur(account_id):
	url = f"https://172.28.20.5:5004/scl/get_data_moderateur/{account_id}"
	headers = {}
	try:
		response = requests.get(url, headers=headers, verify=False, timeout=10)
		response.raise_for_status()

		data = response.json()
		return data.get('data', {})

	except Exception as e:
		print(f"Error: {e}")
		return {}


# Show page session Config
@dashboard_bp.route('/dashboard/show-session-config/<int:id_session>', methods=['GET'])
def show_session_config(id_session):
	if 'moderator_id' not in session:
		return redirect(url_for('auth.login'))
	return render_template('index.html',
						   id_session=id_session,
						   page='session_config')


# Show page Attendance
@dashboard_bp.route('/dashboard/show-attendance-sessions/<int:session_id>', methods=['GET'])
def show_attendance_page(session_id):
	if 'moderator_id' not in session:
		return redirect(url_for('auth.login'))

	return render_template('index.html',
						   id_session=session_id,
						   page='attendance_page')


# Show page edit group
@dashboard_bp.route('/dashboard/create-group-user-session/<int:id_session>')
def show_create_group_session(id_session):
	if 'moderator_id' not in session:
		return redirect(url_for('auth.login'))
	return render_template('index.html',
						   id_session=id_session,
						   page='group_user_session')


# Show page calender Session
@dashboard_bp.route('/dashboard/create-session-calendar/<int:id_session>')
def show_create_session_calendar(id_session):
	if 'moderator_id' not in session:
		return redirect(url_for('auth.login'))
	return render_template('index.html',
						   id_session=id_session,
						   page='session_calander')


# ✅ UPDATED: Show page Show Session - NOW LOADS SESSIONS FROM API
@dashboard_bp.route('/dashboard/show-session')
def show_sessions():
	if 'moderator_id' not in session:
		return redirect(url_for('auth.login'))

	# Get account_id from session
	account_id = session.get('account_id', 3)

	# Get sessions using helper function
	sessions = get_session_slc(account_id)

	return render_template('index.html',
						   sessions=sessions,
						   page='show-session')


# ==========================================PAYMENT SECTION ==========================================
# Show page show payment-session
@dashboard_bp.route('/dashboard/show-payment-session')
def show_payment_session():
	if 'moderator_id' not in session:
		return redirect(url_for('auth.login'))
	return render_template('index.html',
						   page='show-payment-session')


# Show page payment-session-detail
@dashboard_bp.route('/dashboard/show-payment-session-details/<int:session_id>')
def show_payment_session_details(session_id):
	if 'moderator_id' not in session:
		return redirect(url_for('auth.login'))

	return render_template('index.html',
						   page='show_payment_session_detail')


# Show page payment-session-user
@dashboard_bp.route('/dashboard/show-user-session/<int:id_user>/<int:id_session>')
def show_user_session(id_user, id_session):
	if 'moderator_id' not in session:
		return redirect(url_for('auth.login'))

	return render_template('index.html',
						   page='show_payment_user_session')


# ==========================================ATTENDANCE SECTION ==========================================
@dashboard_bp.route('/dashboard/show-attendance-presence/<int:id_attendance>')
def show_attendance_presence(id_attendance):
	if 'moderator_id' not in session:
		return redirect(url_for('auth.login'))
	return render_template('index.html',
						   page='show_attendance_presence')


@dashboard_bp.route('/dashboard', methods=['GET'])
def dashboard():
	if 'moderator_id' not in session:
		return redirect(url_for('auth.login'))

	account_id = session.get('account_id', 3)
	sessions = get_session_slc(account_id)
	data_modera = get_data_moderateur(account_id)

	return render_template('index.html',
						   sessions=sessions,
						   data_modera=data_modera,
						   page='home')