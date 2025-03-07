import { db } from '../../../database';

export const deleteCampaignById = (id: number): Promise<{ id: number }> => {
  const query = 'DELETE FROM campaigns WHERE id = ?';

  return new Promise((resolve, reject) => {
    db.run(query, [id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve({ id });
    });
  });
};
