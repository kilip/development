<?php
/**
 * Created by PhpStorm.
 * User: toni
 * Date: 23/03/18
 * Time: 0:12.
 */

namespace Paroki\DataFixtures\Faker;

use Faker\Provider\Base as FakerBase;

class NamaBaptisProvider
{
    const GENDER_MALE = 'male';
    const GENDER_FEMALE = 'female';

    protected static $santa = array(
        'Adelaide', 'Agatha', 'Agnes', 'Andreas', 'Angela', 'Anna', 'Antonietta', 'Anysia',
        'Basilissa', 'Bernadette', 'Bertilla', 'Bibiana', 'Brigitta', 'Elizabeth', 'Emilia',
        'Eufrasia', 'Faustina', 'Felisitas', 'Fina', 'Flora', 'Foillan', 'Fransiska', 'Genoveva', 'Germana',
        'Gertrude', 'Gianna', 'Gildas', 'Imelda', 'Isidorus', 'Jane', 'Jeanne', 'Joan', 'Jovita',
        'Katarina', 'Klara', 'Koleta', 'Kristina', 'Lidwina', 'Lusia', 'Makrina', 'Margareta',
        'Maria', 'Marta', 'Matilda', 'Michelina', 'Nennolina', 'Odilia', 'Rita', 'Rosa',
        'Serafina', 'Sesilia', 'Skolastika', 'Tekla', 'Teresa', 'Theophane', 'Theresia',
        'Yohana', 'Yudit', 'Yulia', 'Yuliana', 'Zita',
    );

    protected static $santo = array(
        'Agustinus', 'Aidan', 'Akhilleus', 'Albertus', 'Alfonsus', 'Aloysius', 'Ambrosius',
        'Anselmus', 'Antonius', 'Arnoldus', 'Atanasius', 'Barnabas', 'Bartolomeus', 'Basilius',
        'Bathildis', 'Benediktus', 'Berardus', 'Bernardinus', 'Bernardus', 'Bertrand',
        'Blasius', 'Bonaventura', 'Bonifasius', 'Boris', 'Bruno', 'Caesarius', 'Caius', 'Canute',
        'Charles', 'Damasus', 'Damianus', 'David', 'Didakus', 'Dionisius', 'Dominikus', 'Edmund',
        'Edward', 'Efrem', 'Eucherius', 'Eugene', 'Eugenius', 'Eusebius', 'Evaristus', 'Fabianus',
        'Faustinus', 'Felix', 'Fidelis', 'Filipus', 'Flannan', 'Fransiskus',
        'Frederikus', 'Gabriel', 'Georgius', 'Gerardus', 'Giles', 'Gleb', 'Godfrey', 'Gregorius',
        'Henry', 'Hieronimus', 'Hilarion', 'Hippolitus', 'Hugo', 'Ignasius', 'Ireneus', 'Jonas',
        'Julianus', 'Junipero', 'Kalistus', 'Karolus', 'Kasimirus', 'Kornelius', 'Kosmas',
        'Laurensius', 'Leo', 'Leonardus', 'Lorenzo', 'Louis', 'Lucius', 'Ludger', 'Lukas',
        'Lupicinus', 'Markus', 'Marselinus', 'Martin', 'Martinus', 'Matias', 'Matius',
        'Maximilianus', 'Meletius', 'Metodius', 'Mikael', 'Monika', 'Montanus', 'Narcissus',
        'Nikolas', 'Nikolaus  ', 'Nino', 'Norbertus', 'Otto', 'Pankrasius', 'Pantaleon',
        'Pasifikus', 'Paskalis Baylon', 'Patrick', 'Paulinus', 'Paulus', 'Petrus', 'Pio',
        'Pius', 'Polikarpus', 'Pontianus', 'Porkarius', 'Porphyrius', 'Radbertus', 'Rafael',
        'Raymundus', 'Redemptus', 'Richard', 'Robertus', 'Roger', 'Romanus', 'Romualdus',
        'Sebastianus', 'Selestin', 'Sergius', 'Simeon', 'Simon', 'Siprianus', 'Sirilus',
        'Stanislaus', 'Stefanus', 'Tarsisius', 'Theodorus', 'Theodosius', 'Thomas',
        'Timotius', 'Titus', 'Torello', 'Turibius', 'Tutilo', 'Ubaldus', 'Urbanus',
        'Vinsensius', 'Waltrudis', 'William', 'Yakobus', 'Yanuarius', 'Yoakim', 'Yohanes',
        'Yosafat', 'Yosef', 'Yudas', 'Yustinus', 'Yusuf', 'Zakharia',
    );

    /**
     * @param $gender
     *
     * @return mixed
     *
     * @throws \Exception
     */
    public static function namaBaptis($gender)
    {
        if ($gender === static::GENDER_MALE) {
            return FakerBase::randomElement(static::$santo);
        }
        if ($gender === static::GENDER_FEMALE) {
            return FakerBase::randomElement(static::$santa);
        }
        throw new \Exception('Unknown gender: '.$gender);
    }
}
