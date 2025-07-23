import cron from "node-cron";
import moment from "moment";
import loanRepository from "../repositories/loan.repository.js";
import sendReminderEmail from "./email.service.js";
import userRepository from "../repositories/user.repository.js";
import bookRepository from "../repositories/book.repository.js"

cron.schedule("11 * * * *", async () => {
  console.log("Running daily job to check for due dates...");
  const loans = await loanRepository.findAllLoansRepository;
  const today = moment().startOf("day");

  loans.forEach( async (loan) => {
    const dueDate = moment(loan.dueDate).startOf("day");
    const reminderDueDate = moment(dueDate).subtract(1, "days");
    const userLoan = await userRepository.findByIdUserRepository(loan.userId)
    const bookLoan = await bookRepository.findBookByIdRepository
    if (today.isSame(reminderDueDate)) {
      sendReminderEmail(loans.email, loans.title, loan.dueDate);
    }
  });
});
