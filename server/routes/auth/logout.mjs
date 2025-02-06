import { Router } from 'express'
const router = Router()

router.post("/api/auth/logout", (request, response, next) => {
    console.log("here");
    
    request.logout(function(err) {
        if (err) {
            return next(err);
        }
        
        request.session.destroy(err => {
            if (err) {
                return response.status(500).json({ message: 'Error destroying session' });
            }   
            response.clearCookie('connect.sid');
            response.sendStatus(200)
        });
    });
});
export default router