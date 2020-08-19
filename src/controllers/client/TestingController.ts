import { Request, Response } from 'express';

class TestingController {
    index = async (req: Request, res: Response): Promise<Response> => {
        return res.send({
            data: [{
                status: 'oke'
            }],
            msg: 'success'
        });
    }
}

export default new TestingController;