export const BASE_URL="http://localhost:5000"
// export const BASE_URL="https://api.resume-sort-app.cosbe.inc" 
// export const BASE_URL="https://5tig4dhqtk.execute-api.us-east-1.amazonaws.com/dev" 
export const LOGIN_URL=BASE_URL+"/api/v1/resume_sort_app/auth/login"
export const CREATE_PROJECT_URL=BASE_URL+"/api/v1/resume_sort_app/project/create"
export const GET_ALL_PROJECTS_URL=BASE_URL+"/api/v1/resume_sort_app/projects"
export const DELETE_PROJECT_URL=BASE_URL+"/api/v1/resume_sort_app/project/"
export const UPLOAD_RESUME=BASE_URL+"/api/v1/resume_sort_app/dashboard/upload_and_extract"
export const DOWNLOAD_RESUME=BASE_URL+"/api/v1/resume_sort_app/dashboard/download_pdf"
export const GET_RESUME_DATA=BASE_URL+"/api/v1/resume_sort_app/dashboard/resumes_data"
export const GET_PROFILE_IMAGE=BASE_URL+"/api/v1/resume_sort_app/dashboard/profile_image"
export const VERIFY_COOKIE=BASE_URL+"/api/v1/resume_sort_app/auth/verify"
export const LOGOUT_URL=BASE_URL+"/api/v1/resume_sort_app/auth/logout"