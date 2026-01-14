from flask import Blueprint, render_template, request, jsonify, session, redirect, url_for
import requests
from nacl.pwhash import verify

dashboard_bp = Blueprint('dashboard', __name__)


# ==========================================
# HELPER FUNCTIONS - API CALLS TO SLC
# ==========================================

# function to get list student of the calendar
def get_list_student(calendar_id):
	url = f"https://172.28.20.5:5004/scl/list-add-student-attendance/{calendar_id}"
	try:
		response = requests.get(url, verify=False)
		response.raise_for_status()
		if response.status_code == 200:
			data = response.json()
			users = data.get("users",[])
			return users
		else:
			print("there is no user for this attendance")
			return []

	except Exception as e:
		print(f"Problem {e} is coming from the server ")
		return []


# function to get the detail of the calendar
def detail_calender_by_id(calender_id):
	url=f"https://172.28.20.5:5004/scl/get_calander_id/{calender_id}"
	try:
		response = requests.get(url,verify=False)
		response.raise_for_status()
		if(response.status_code==200):
			data= response.json()
			calendar=data.get("data",[])
			return calendar
	except Exception as e :
		print(f"DEBUG: Error {e} from the local server !!")
		return []


# function to get the attendance of the calendar
def attendance_by_id(calendar_id):
	url = f"https://172.28.20.5:5004/scl/get-attendance/{calendar_id}"
	try:
		response = requests.get(url,verify=False)
		response.raise_for_status()
		if response.status_code == 200:
			data = response.json()
			attendance = data.get("attendance",[])
			return attendance
		else:
			print("there is no attendance for this calendar")
			return []
	except Exception as e :
		print("Error coming from server")
		return []


def get_calander_per_session(account_id, session_id):
	"""Get calendar data for a specific session from SLC API"""
	url = f"https://172.28.20.5:5004/scl/get_calendar_session/{session_id}/{account_id}"
	try:
		response = requests.get(url, verify=False)
		response.raise_for_status()
		if response.status_code == 200:
			data = response.json()
			calendar = data.get("data", [])
			return calendar
		else:
			print(f"Error: API returned status {response.status_code}")
			return []
	except Exception as e:
		print(f"DEBUG: Error {e} from the local server !!")
		return []


def get_local(account_id):
	"""Get local details from SLC API"""
	url = f"https://172.28.20.5:5004/scl/get_local_detail/{account_id}"
	try:
		response = requests.get(url, verify=False)
		response.raise_for_status()
		if response.status_code == 200:
			data = response.json()
			local_detail = data.get('data', [])
			return local_detail
		else:
			print(f"Error: API returned status {response.status_code}")
			return []
	except Exception as e:
		print(f"DEBUG: Error {e}")
		return []


def get_session_slc(account_id):
	"""Get all sessions from SLC API"""
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
	"""Get moderator data from SLC API"""
	url = f"https://172.28.20.5:5004/scl/get_data_moderateur/{account_id}"
	try:
		response = requests.get(url, verify=False, timeout=10)
		response.raise_for_status()
		data = response.json()
		return data.get('data', {})
	except Exception as e:
		print(f"Error: {e}")
		return {}


# ==========================================
# API ENDPOINTS - JSON RESPONSES
# ==========================================

@dashboard_bp.route('/dashboard/get_calander_per_session/<int:account_id>/<int:session_id>', methods=['GET'])
def api_get_calendar_per_session(account_id, session_id):
	"""API endpoint to get calendar data as JSON"""
	try:
		calendar = get_calander_per_session(account_id, session_id)
		return jsonify({
			'success': True,
			'data': calendar
		}), 200
	except Exception as e:
		print(f"DEBUG: Error {e}")
		return jsonify({
			'success': False,
			'error': str(e),
			'data': []
		}), 500


# ==========================================
# DASHBOARD HOME
# ==========================================

@dashboard_bp.route('/dashboard', methods=['GET'])
def dashboard():
	"""Main dashboard page"""
	if 'moderator_id' not in session:
		return redirect(url_for('auth.login'))

	account_id = session.get('account_id', 3)
	sessions = get_session_slc(account_id)
	data_modera = get_data_moderateur(account_id)
	local_details = get_local(account_id)

	return render_template('index.html',
						   sessions=sessions,
						   data_modera=data_modera,
						   local_details=local_details,
						   page='home')


# ==========================================
# SESSION MANAGEMENT ROUTES
# ==========================================

@dashboard_bp.route('/dashboard/show-session')
def show_sessions():
	"""Display all sessions page"""
	if 'moderator_id' not in session:
		return redirect(url_for('auth.login'))

	account_id = session.get('account_id', 3)
	sessions = get_session_slc(account_id)

	return render_template('index.html',
						   sessions=sessions,
						   page='show-session')


@dashboard_bp.route('/dashboard/create-session', methods=['GET'])
def create_session():
	"""Create new session page"""
	if 'moderator_id' not in session:
		return redirect(url_for('auth.login'))

	return render_template('index.html',
						   page='create-session')


@dashboard_bp.route('/dashboard/show-session-config/<int:id_session>', methods=['GET'])
def show_session_config(id_session):
	"""Session configuration page"""
	if 'moderator_id' not in session:
		return redirect(url_for('auth.login'))

	account_id = session.get('account_id', 3)
	calendar_data = get_calander_per_session(account_id, id_session)
	local_details = get_local(account_id)
	sessions = get_session_slc(account_id)
	data_modera = get_data_moderateur(account_id)

	return render_template('index.html',
	                       id_session=id_session,
                           account_id=account_id,  # Add this line
                           calendar_data=calendar_data,
                           local_details=local_details,
                           sessions=sessions,
                           data_modera=data_modera,
                           page='session_config')

# ==========================================
# CALENDAR ROUTES
# ==========================================

@dashboard_bp.route('/dashboard/create-session-calendar/<int:id_session>')
def show_create_session_calendar(id_session):
	"""Create/edit session calendar page"""
	if 'moderator_id' not in session:
		return redirect(url_for('auth.login'))

	return render_template('index.html',
						   id_session=id_session,
						   page='session_calander')


# ==========================================
# GROUP MANAGEMENT ROUTES
# ==========================================

@dashboard_bp.route('/dashboard/create-group-user-session/<int:id_session>')
def show_create_group_session(id_session):
	"""Create/edit group for session page"""
	if 'moderator_id' not in session:
		return redirect(url_for('auth.login'))

	return render_template('index.html',
						   id_session=id_session,
						   page='group_user_session')


# ==========================================
# ATTENDANCE ROUTES
# ==========================================

@dashboard_bp.route('/dashboard/show-attendance-sessions/<int:session_id>', methods=['GET'])
def show_attendance_page(session_id):
	"""Show attendance overview for session"""
	if 'moderator_id' not in session:
	    return redirect(url_for('auth.login'))

	account_id = session.get('account_id', 3)  # Add this line

	return render_template('index.html',
	                       id_session=session_id,
                           account_id=account_id,  # Add this line
                           page='attendance_page')

# Page of attendance per session
@dashboard_bp.route('/dashboard/show-attendance-presence/<int:id_calander>')
def show_attendance_presence(id_calander):
	from datetime import datetime
	"""Show detailed attendance/presence page"""
	if 'moderator_id' not in session:
		return redirect(url_for('auth.login'))

	calender_detail = detail_calender_by_id(id_calander)
	attendance = attendance_by_id(id_calander)
	list_student = get_list_student(id_calander)

	# Parse datetime strings if they exist
	if calender_detail and isinstance(calender_detail.get('start_time'), str):
		try:
			calender_detail['start_time'] = datetime.strptime(
				calender_detail['start_time'],
				'%a, %d %b %Y %H:%M:%S %Z'
			)
		except (ValueError, TypeError):
			calender_detail['start_time'] = None

	if calender_detail and isinstance(calender_detail.get('end_time'), str):
		try:
			calender_detail['end_time'] = datetime.strptime(
				calender_detail['end_time'],
				'%a, %d %b %Y %H:%M:%S %Z'
			)
		except (ValueError, TypeError):
			calender_detail['end_time'] = None

	return render_template('index.html',
						   id_calander=id_calander,
						   calender_detail=calender_detail,
						   attendance=attendance,
						   student=list_student,
						   page='show_attendance_presence')


# @dashboard_bp.route()
# def update_attendance(status,id_attendance):





# ==========================================
# PAYMENT ROUTES
# ==========================================

@dashboard_bp.route('/dashboard/show-payment-session')
def show_payment_session():
	"""Show all payment sessions"""
	if 'moderator_id' not in session:
		return redirect(url_for('auth.login'))

	return render_template('index.html',
						   page='show-payment-session')


@dashboard_bp.route('/dashboard/show-payment-session-details/<int:session_id>')
def show_payment_session_details(session_id):
	"""Show payment details for specific session"""
	if 'moderator_id' not in session:
		return redirect(url_for('auth.login'))

	return render_template('index.html',
						   session_id=session_id,
						   page='show_payment_session_detail')


@dashboard_bp.route('/dashboard/show-user-session/<int:id_user>/<int:id_session>')
def show_user_session(id_user, id_session):
	"""Show payment details for specific user in session"""
	if 'moderator_id' not in session:
		return redirect(url_for('auth.login'))

	return render_template('index.html',
						   id_user=id_user,
						   id_session=id_session,
						   page='show_payment_user_session')



# ==========================================
# UNKNOWN ROUTES
# ==========================================

# Show page unknown
@dashboard_bp.route('/dashboard/show-attendance-unknown-student/<int:calender_id>')
def show_attendance_unknown(calender_id):
	"""show unknown student"""
	if 'moderator_id' not in session:
		return redirect(url_for('auth.login'))
	else:
		return render_template('index.html',
							   calender_id = calender_id,
							   page="show-unknown-student")

