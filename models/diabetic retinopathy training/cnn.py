import random
from random import random
import numpy as np
import pandas as pd
from keras.callbacks import EarlyStopping
from keras.layers import Dense, Dropout, Activation, Flatten
from keras.layers import MaxPooling2D
from keras.layers.convolutional import Conv2D
from keras.models import Sequential
from keras.utils import np_utils
# from keras.utils import multi_gpu_model a
from sklearn.metrics import precision_score
from sklearn.metrics import recall_score
from sklearn.metrics import f1_score
from sklearn.metrics import cohen_kappa_score
from sklearn.model_selection import train_test_split
from sklearn.utils import class_weight
# from sklearn.metrics import kappa as
# cohen_kappa_score
from keras.models import load_model
np.random.seed(1337)


class EyeNet:
    def __init__(self):
        self.X = None
        self.y = None
        self.X_train = None
        self.X_test = None
        self.y_train = None
        self.y_test = None
        self.test_data_size = None
        self.weights = None
        self.model = None
        self.nb_classes = None
        self.img_rows = 256
        self.img_cols = 256
        self.channels = 3
        self.n_gpus = 1

    def split_data(self, y_file_path, X, test_data_size=0.3):
        """
        Split data into test and training data sets.

        INPUT
            y_file_path: path to CSV containing labels
            X: NumPy array of arrays
            test_data_size: size of test/train split. Value from 0 to 1

        OUTPUT
            Four arrays: X_train, X_test, y_train, and y_test
        """
        # labels = pd.read_csv(y_file_path, nrows=60) no use
        labels = pd.read_csv(y_file_path)
        self.X = np.load(X)
        self.y = np.array(labels['level'])
        print(np.unique(self.y))
        print(self.y)
        # self.weights = class_weight.compute_class_weight( no use
        #     class_weight={0: 0., 1: 1.}, classes=np.unique(self.y), y=self.y)
        # self.weights = {
        #     0: random.random(),
        #     1: random.random()
        # }
        print(self.weights)
        self.test_data_size = test_data_size
        self.X_train, self.X_test, self.y_train, self.y_test = train_test_split(self.X, self.y,
                                                                                test_size=self.test_data_size,
                                                                                random_state=42)

    def reshape_data(self, img_rows, img_cols, channels, nb_classes):
        """
        Reshapes arrays into format for MXNet

        INPUT
            img_rows: Array (image) height
            img_cols: Array (image) width
            channels: Specify if image is grayscale(1) or RGB (3)
            nb_classes: number of image classes/ categories

        OUTPUT
            Reshaped array of NumPy arrays
        """
        self.nb_classes = nb_classes
        self.X_train = self.X_train.reshape(
            self.X_train.shape[0], img_rows, img_cols, channels)
        self.X_train = self.X_train.astype("float32")
        self.X_train /= 255

        self.y_train = np_utils.to_categorical(self.y_train, self.nb_classes)

        # self.X_test = self.X_test.reshape(
        #     self.X_test.shape[0], img_rows, img_cols, channels)
        # self.X_test = self.X_test.astype("float32")
        # self.X_test /= 255

        # self.y_test = np_utils.to_categorical(self.y_test, self.nb_classes)

        print("X_train Shape: ", self.X_train.shape)
        print("X_test Shape: ", self.X_test.shape)
        print("y_train Shape: ", self.y_train.shape)
        print("y_test Shape: ", self.y_test.shape)

    def cnn_model(self, nb_filters, kernel_size, batch_size, nb_epoch):
        """
        Define and run the convolutional neural network

        """

        self.model = Sequential()
        self.model.add(Conv2D(nb_filters, (kernel_size[0], kernel_size[1]),
                              padding="valid",
                              strides=1,
                              input_shape=(self.img_rows, self.img_cols, self.channels), activation="relu"))

        self.model.add(
            Conv2D(nb_filters, (kernel_size[0], kernel_size[1]), activation="relu"))

        self.model.add(
            Conv2D(nb_filters, (kernel_size[0], kernel_size[1]), activation="relu"))

        self.model.add(MaxPooling2D(pool_size=(8, 8)))

        self.model.add(Flatten())
        print("Model flattened out to: ", self.model.output_shape)

        self.model.add(Dense(2048, activation="relu"))
        self.model.add(Dropout(0.25))

        self.model.add(Dense(2048, activation="relu"))
        self.model.add(Dropout(0.25))

        self.model.add(Dense(self.nb_classes, activation="softmax"))

        # self.model = multi_gpu_model(self.model, gpus=self.n_gpus) as

        self.model.compile(loss="binary_crossentropy",
                           optimizer="adam",
                           metrics=["accuracy"])

        stop = EarlyStopping(monitor="val_accuracy", min_delta=0.001,
                             patience=2,
                             mode="auto")

        self.model.fit(self.X_train, self.y_train, batch_size=batch_size,
                       epochs=nb_epoch,
                       verbose=1,
                       validation_split=0.2,
                       class_weight=self.weights,
                       callbacks=[stop])
        self.model.save_weights(filepath='./weights.h5')
        return self.model

    def retrain(self, batch_size, nb_epoch, file_name):
        """
        Rertrains the already trained model with new data
        INPUT:
            model ,batch_size and epoch
            filename with complete path of the trained model 
        OUTPUT:
            retained model
        """
        self.model = load_model(file_name)
        # self.model.load_weights(filepath='./weights.h5') no use
        stop = EarlyStopping(monitor="val_accuracy", min_delta=0.001,
                             patience=2,
                             mode="auto")

        self.model.fit(self.X_train, self.y_train, batch_size=batch_size,
                       epochs=nb_epoch,
                       verbose=1,
                       validation_split=0.2,
                       callbacks=[stop])

        return self.model

    def predict(self):
        """
        Predicts the model output, and computes precision, recall, and F1 score.

        INPUT
            model: Model trained in Keras

        OUTPUT
            Precision, Recall, and F1 score
        """
        predictions = self.model.predict(self.X_test)
        predictions = np.argmax(predictions, axis=1)

        # predictions[predictions >=1] = 1
        # Remove when non binary classifier

        self.y_test = np.argmax(self.y_test, axis=1)

        precision = precision_score(self.y_test, predictions, average="micro")
        recall = recall_score(self.y_test, predictions, average="micro")
        f1 = f1_score(self.y_test, predictions, average="micro")
        cohen_kappa = cohen_kappa_score(self.y_test, predictions)
        return precision, recall, f1, cohen_kappa, 'No Cuda Training'

    def save_model(self, score, model_name):
        """
        Saves the model, based on scoring criteria input.

        INPUT
            score: Scoring metric used to save model or not.
            model_name: name for the model to be saved.

        OUTPUT
            Saved model, based on scoring criteria input.
        """
        if score >= 0.5:
            print("Saving Model")
            self.model.save("./models/" + model_name)
        else:
            print("Model Not Saved. Score: ", score)


if __name__ == '__main__':
    cnn = EyeNet()
    # cnn.split_data(y_file_path=r"./Data/X_train_labels_015.csv",
    #                X=r"./Data/X_train_015.npy")
    # cnn.reshape_data(img_rows=256, img_cols=256, channels=3, nb_classes=2)
    # model = cnn.cnn_model(nb_filters=32, kernel_size=(
    #     4, 4), batch_size=16, nb_epoch=10)
    # precision, recall, f1, cohen_kappa, quad_kappa = cnn.predict()
    # print("Precision: ", precision)
    # print("Recall: ", recall)
    # print("F1: ", f1)
    # print("Cohen Kappa Score", cohen_kappa)
    # print("Quadratic Kappa: ", quad_kappa)
    # cnn.save_model(score=recall, model_name="DR_14.h5")

    cnn.split_data(y_file_path=r"./Data/X_train_labels_1530.csv",
                   X=r"./Data/X_train_1530.npy")
    cnn.reshape_data(img_rows=256, img_cols=256, channels=3, nb_classes=2)
    model = cnn.retrain(batch_size=10, nb_epoch=10,
                        file_name=r'./models/DR_14.h5')
    precision, recall, f1, cohen_kappa, quad_kappa = cnn.predict()
    print("Precision: ", precision)
    print("Recall: ", recall)
    print("F1: ", f1)
    print("Cohen Kappa Score", cohen_kappa)
    print("Quadratic Kappa: ", quad_kappa)
    cnn.save_model(score=recall, model_name="DR_24.h5")

    # cnn.split_data(y_file_path=r"./Data/X_train_labels_3045.csv",
    #                X=r"./Data/X_train_3045.npy")
    # cnn.reshape_data(img_rows=256, img_cols=256, channels=3, nb_classes=2)

    # model = cnn.retrain(batch_size=16, nb_epoch=10,
    #                     file_name=r'./models/DR_24.h5')
    # precision, recall, f1, cohen_kappa, quad_kappa = cnn.predict()
    # print("Precision: ", precision)
    # print("Recall: ", recall)
    # print("F1: ", f1)
    # print("Cohen Kappa Score", cohen_kappa)
    # print("Quadratic Kappa: ", quad_kappa)
    # cnn.save_model(score=recall, model_name="DR_34.h5")

    # cnn.split_data(y_file_path=r"./Data/X_train_labels_45.csv",
    #                X=r"./Data/X_train_45.npy")
    # cnn.reshape_data(img_rows=256, img_cols=256, channels=3, nb_classes=2)
    # model = cnn.retrain(batch_size=16, nb_epoch=10,
    #                     file_name=r'./models/DR_34.h5')
    # precision, recall, f1, cohen_kappa, quad_kappa = cnn.predict()
    # print("Precision: ", precision)
    # print("Recall: ", recall)
    # print("F1: ", f1)
    # print("Cohen Kappa Score", cohen_kappa)
    # print("Quadratic Kappa: ", quad_kappa)

    # cnn.save_model(score=recall, model_name="DR_44.h5")


# dr_14.h5 = 0.4941
# dr_24.h5 = 0.5064
