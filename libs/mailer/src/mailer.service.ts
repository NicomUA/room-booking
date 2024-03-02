import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Booking, User } from '@prisma/client';

@Injectable()
export class MailerService {
  private async sendEmail(email, text): Promise<boolean> {
    // create event in Queue(Kafka/RabbitMQ/SQS) to send email
    // or use third party service

    setTimeout(() => {
      console.log('Email sent', email, text);
      return true;
    }, 2000);

    return true;
  }

  async sendBookingConfirmation(
    user: Omit<User, 'password'>,
    booking: Booking,
  ): Promise<boolean> {
    // send booking confirmation email
    // create event in Queue(Kafka/RabbitMQ/SQS) to send email
    // or use third party service

    // better to use templates

    try {
      const text = `
      Hello, ${user.name}.
      Your booking has been confirmed.

      Room: ${booking.roomId}
      Start: ${booking.startTime}
      End: ${booking.endTime}
    `;

      await this.sendEmail(user.email, text);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return true;
  }
}
