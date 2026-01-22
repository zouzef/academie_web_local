from flask import Blueprint, render_template, request, jsonify, session, redirect, url_for
import requests
from nacl.pwhash import verify

dashboard_bp = Blueprint('dashboard', __name__)


# ==========================================
# VARIABLE
# ==========================================

BASE_URL = "https://172.28.20.105:5004/scl/"




# ==========================================
# HELPER FUNCTIONS - API CALLS TO SLC
# ==========================================

# function to get list student of the calendar
def get_list_student(calendar_id):
	url = f"{BASE_URL}list-add-student-attendance/{calendar_id}"
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
	url=f"{BASE_URL}get_calander_id/{calender_id}"
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


# api to delete calander
@dashboard_bp.route('/api/delete-calander/<int:session_id>', methods=['DELETE', 'POST'])
def delete_calander(session_id):
	url = f"{BASE_URL}deleting_interval/{session_id}"
	try:
		data = request.json

		if not data:
			return jsonify({"message": "No data provided"}), 400

		start_date = data.get('start_date')
		end_date = data.get('end_date')
		print(f"Received - Start Date: {start_date}, End Date: {end_date}")

		if not start_date or not end_date:
			return jsonify({"message": "Error: missing start_date or end_date"}), 400

		from datetime import datetime
		try:

			datetime.strptime(start_date, '%Y-%m-%d')
			datetime.strptime(end_date, '%Y-%m-%d')
			start_date_with_time = f"{start_date} 00:00:00"
			end_date_with_time = f"{end_date} 23:59:59"

		except ValueError:
			return jsonify({"message": "Invalid date format. Use YYYY-MM-DD"}), 400
		response = requests.post(url, json={
			'start_date': start_date_with_time,
			'end_date': end_date_with_time
		},
		verify=False)
		if response.status_code == 200:
			return jsonify({
				"message": "Calendar interval deleted successfully",
				"start_date": start_date,
				"end_date": end_date
			}), 200
		else:
			return jsonify({
				"message": "Failed to delete interval from external API",
				"error": response.text,
				"status_code": response.status_code
			}), 400
	except requests.exceptions.RequestException as e:
		return jsonify({"message": "Error connecting to external server", "error": str(e)}), 500
	except Exception as e:
		import traceback
		traceback.print_exc()
		return jsonify({"message": "Internal server error", "error": str(e)}), 500








# function to get the attendance of the calendar
def attendance_by_id(calendar_id):
	url = f"{BASE_URL}get-attendance/{calendar_id}"
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
	url = f"{BASE_URL}get_calendar_session/{session_id}/{account_id}"
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

# Function to get local
def get_local(account_id):
	"""Get local details from SLC API"""
	url = f"{BASE_URL}get_local_detail/{account_id}"
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

# Function to get Room from local
@dashboard_bp.route("/api/get_room/<int:local_id>")
def get_room(local_id):
	url = f"{BASE_URL}/get_room/{local_id}"
	try:
		response = requests.get(url,verify=False)
		response.raise_for_status()
		if response.status_code == 200:
			data = response.json()
			room = data.get("data",[])
			return jsonify({"Message": "Success", "Room": room})
	except Exception as e:
		print(f"Error {e} coming from get_ room")
		return jsonify({"Message":f"Error {e}"}),500

# Function to get Teacher from session
@dashboard_bp.route("/api/get_teacher/<int:session_id>")
def get_teacher(session_id):
	url = f"{BASE_URL}get_teacher/{session_id}"
	try:
		response = requests.get(url,verify=False)
		response.raise_for_status()
		if response.status_code==200:
			data = response.json()
			teacher = data.get("data",[])
			return jsonify({"Message":"Success","teacher":teacher}),200
		else:
			return jsonify({"Message": "there is no teacher","Teacher":[]}),404

	except Exception as e:
		print(f"Error {e}")
		return jsonify({"message":f"Error {e} coming from get teacher"}),500



def get_session_slc(account_id):
	"""Get all sessions from SLC API"""
	url = f"{BASE_URL}get_session_detail/{account_id}"
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
	url = f"{BASE_URL}get_data_moderateur/{account_id}"
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


# api get group with student
@dashboard_bp.route('/api/get-group/<int:session_id>/<int:account_id>')
def get_group_api(session_id,account_id):
	url = f"{BASE_URL}get-group/{account_id}/{session_id}"
	try:
		response = requests.get(url,verify=False)
		print(response)
		response.raise_for_status()
		if response.status_code ==200:
			data = response.json()
			groups = data.get("data",[])
			return jsonify({"Message":"Success", "data":groups}),200
		else:
			return jsonify({"Message":"Error","data":[]}),400
	except Exception as e:
		print(f"Error coming from get_group_route {e}")
		return jsonify({"Message": "Error"}),500

# api delete group by id
@dashboard_bp.route('/api/delete-group/<int:id_group>',methods=["DELETE"])
def delete_group(id_group):
	print(id_group)
	return jsonify({"Message":"success"}),200
	# url =f"{BASE_URL}//{id_group}"
	# try:
	# 	response = requests.post(url,verify=False)
	# 	response.raise_for_status()
	# 	if response.status_code == 200:
	#
	# 		return jsonify({"Message":"Succes group deleted "}),200
	# 	else:
	# 		return jsonify({"Message":"Error",}),400
	#
	# except Exception as e:
	# 	print(f"Error coming from delete group")
	# 	return jsonify({"Message":f"Error {e}"}),500


@dashboard_bp.route('/dashboard/create-session-calendar/<int:id_session>')
def show_create_session_calendar(id_session):
	"""Create/edit session calendar page"""
	if 'moderator_id' not in session:
		return redirect(url_for('auth.login'))

	return render_template('index.html',
						   id_session=id_session,
						   page='session_calander')


# =================== user not affected =======================
@dashboard_bp.route('/api/show_user_not_affected/<int:session_id>/<int:account_id>')
def show_user_not_affected(session_id, account_id):
	url = f"{BASE_URL}user_not_affected/{session_id}/{account_id}"
	try:

		response = requests.get(url, verify=False)
		response.raise_for_status()
		if response.status_code == 200:
			data = response.json()
			user_not_affected = data.get("students", [])  # Changed from "data" to "students"
			return jsonify({"Message": "Success", "students": user_not_affected}), 200
		else:
			return jsonify({"Message": "Error", "students": []}), 400
	except Exception as e:
		print(f"Error: {e}")
		return jsonify({"Message": "Error coming from server", "students": []}), 500


@dashboard_bp.route('/api/affect_user/<int:session_id>', methods=["POST"])  # Changed to POST
def affect_user(session_id):
	url = f"{BASE_URL}affect_user_group/{session_id}"
	try:
		data = request.get_json()  # Changed from request.json()

		if not data:
			return jsonify({"Message": "No data provided"}), 400

		if not data.get("user_id") or not data.get("group_id"):
			return jsonify({"Message": "Missing user_id or group_id"}), 400

		payload = {
			"user_id": data.get("user_id"),
			"group_id": data.get("group_id")
		}

		# Changed to requests.post() and json= parameter
		response = requests.post(url, json=payload, verify=False)
		response.raise_for_status()

		if response.status_code == 200:
			result = response.json()
			return jsonify({"Message": "Success", "data": result}), 200
		else:
			return jsonify({"Message": "Failed to affect student"}), 400

	except requests.exceptions.RequestException as e:
		print(f"Request error {e}")
		return jsonify({"Message": f"Request error: {e}"}), 500

	except Exception as e:
		print(f"Error {e} coming from server")
		return jsonify({"Message": f"Error: {e}"}), 500



# ==========================================
# GROUP MANAGEMENT ROUTES
# ==========================================

@dashboard_bp.route('/dashboard/create-group-user-session/<int:id_session>')
def show_create_group_session(id_session):
	"""Create/edit group for session page"""
	if 'moderator_id' not in session:
		return redirect(url_for('auth.login'))

	# Get account_id AFTER checking login (moved this line down)
	account_id = session.get('account_id', 3)  # 3 is default if not found

	return render_template('index.html',
						   id_session=id_session,
						   account_id=account_id,  # Now pass it to template
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
	print(attendance)
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



# Change Status endpoint
@dashboard_bp.route("/api/change-status/<int:status>/<int:attendance_id>")
def update_attendance(status, attendance_id):
	url = f"{BASE_URL}update-attendance-student/{attendance_id}"
	try:
		is_present = status == 1
		payload = {
			"status": is_present
		}
		print(payload)
		response = requests.post(url,json=payload,headers={'Content-Type': 'application/json'},verify=False)
		if response.status_code == 200:
			print("response==200")
			return jsonify({
				"success": True,
				"message": "Attendance updated successfully",
				"data": response.json()
			}), 200
		else:
			return jsonify({
				"success": False,
				"message": "Failed to update attendance",
				"error": response.json() if response.text else "Unknown error",
				"status_code": response.status_code
			}), response.status_code

	except requests.exceptions.ConnectionError as e:
		print(f"Connection Error: {e}")
		return jsonify({
			"success": False,
			"message": "Could not connect to the attendance service"
		}), 500
	except requests.exceptions.Timeout as e:
		print(f"Timeout Error: {e}")
		return jsonify({
			"success": False,
			"message": "Request timed out"
		}), 500
	except Exception as e:
		print(f"Error {e} coming from update_attendance!!")
		return jsonify({
			"success": False,
			"message": "An unexpected error occurred",
			"error": str(e)
		}), 500

# Change Note EndPoint
@dashboard_bp.route("/api/change-note/<int:attendance_id>", methods=['POST'])
def update_note(attendance_id):
	url = f"{BASE_URL}update-attendance-note/{attendance_id}"

	try:
		# Get the note from the request body
		if request.is_json:
			data = request.get_json()
			note = data.get('note', '')
		else:
			note = request.form.get('note', '')
		payload = {
			"note": note
		}
		response = requests.post(url,json=payload,verify=False)
		if response.status_code == 200:
			return jsonify({
				"success": True,
				"message": "Note updated successfully",
				"data": response.json()
			}), 200
		else:
			return jsonify({
				"success": False,
				"message": "Failed to update note",
				"error": response.json() if response.text else "Unknown error",
				"status_code": response.status_code
			}), response.status_code

	except requests.exceptions.ConnectionError as e:
		print(f"Connection Error: {e}")
		return jsonify({
			"success": False,
			"message": "Could not connect to the attendance service"
		}), 500

	except requests.exceptions.Timeout as e:
		print(f"Timeout Error: {e}")
		return jsonify({
			"success": False,
			"message": "Request timed out"
		}), 500

	except Exception as e:
		print(f"Error {e} coming from update_note!!")
		return jsonify({
			"success": False,
			"message": "An unexpected error occurred",
			"error": str(e)
		}), 500


# api to reset attendance
@dashboard_bp.route("/api/reset-attendance/<int:calander_id>",methods=["post"])
def reset_attendance(calander_id):
	url = f"{BASE_URL}reset_attendance/{calander_id}"
	try:
		response = requests.get(url,verify=False)
		response.raise_for_status()
		if(response.status_code == 200):
			return jsonify({"Message": "Operation reset success! "}),200
		else:
			return jsonify({"Message":"Error coming from server"}),500
	except Exception as e:
		print("Error coming from reset_attendance")
		return jsonify({"Message":f"Error {e}"}),500




#api to get statistic
@dashboard_bp.route("/api/get-statistic/<int:calander_id>",methods=["GET"])
def get_calender_statistic(calander_id):
	url =f"{BASE_URL}attendance-statistics/{calander_id}"
	try:
		response = requests.get(url,verify=False)
		response.raise_for_status()
		if response.status_code == 200:
			data=response.json()
			return jsonify({"Message": "succes","data":data}),200
		else:
			return jsonify({"Message":"Error coming from server"}),500

	except Exception as e:
		print(f"Error:{e} coming from get statistic")
		return jsonify({"Message":"Error "}),500





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

